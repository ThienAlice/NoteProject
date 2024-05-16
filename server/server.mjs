import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServer } from "@apollo/server";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import firebaseConfig from "./firebaseConfig.js";
import "dotenv/config";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import { getAuth } from "firebase-admin/auth";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const app = express();
const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

const authorizationJWTMidleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Forbidden", error: err });
      });
  } else {
    next();
  }
};

app.use(
  cors(),
  bodyParser.json(),
  authorizationJWTMidleware,
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);

// Connect to database
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7ciepzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    mongoose.deleteModel("Folder");
    console.log("Connected to database");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
