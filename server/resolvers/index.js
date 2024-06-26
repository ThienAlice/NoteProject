import { PubSub } from "graphql-subscriptions";
import {
  AuthorModel,
  FolderModel,
  NoteModel,
  NotificationModel,
} from "../models/index.js";
import { GraphQLScalarType, subscribe } from "graphql";
const pubsub = new PubSub();
export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({ authorId: context.uid }).sort({
        updatedAt: "desc",
      });
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({
        _id: folderId,
      });

      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const foundNote = await NoteModel.findOne({
        _id: noteId,
      });
      return foundNote;
    },
  },
  Folder: {
    author: (parent, args, context, info) => {
      const authorId = parent.authorId;
      const author = AuthorModel.findOne({ uid: authorId });
      return author;
    },
    notes: async (parent, args, context, info) => {
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      pubsub.publish("FOLDER_CREATED", {
        folderCreated: {
          message: "A new folder created",
        },
      });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      } else {
        return foundUser;
      }
    },
    addNote: async (parent, args, context) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, args, context) => {
      const noteId = args.id;

      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    addNotification: async (parent, args) => {
      const newNotification = await new NotificationModel(args);
      pubsub.publish("PUSH_NOTIFICATION", {
        notification: {
          message: args.message,
        },
      });
      await newNotification.save();
      return newNotification;
    },
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED"]),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
    },
  },
};
