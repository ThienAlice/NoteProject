export const typeDefs = `#graphql

  scalar Date
  type Folder {
    id:String,
    name:String,
    createdAt:String,
    author: Author,
    notes : [Note]
  }
  type Note {
    id:String,
    content:String,
    updatedAt:Date
  }
  type Author {
    name:String,
    uid:String
  }
  type Message{
    message:String
  }
  type Query{
    folders:[Folder],
    folder(folderId:String): Folder,
    note(noteId:String):Note
  }
  type Mutation{
    addFolder(name:String):Folder,
    register(uid:String!,name:String):Author
    addNote(content:String,folderId:ID):Note
    updateNote(id:String,content:String):Note
    addNotification(message:String):Message
  }
  type Subscription{
    folderCreated:Message
    notification:Message
  }
`;
