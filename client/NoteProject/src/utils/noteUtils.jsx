import { GrapQLrequest } from "./request";
export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String) {
                      folder(folderId: $folderId) {
                        id
                        name
                        notes {
                          id
                          content
                          updatedAt
                        }
                      }
                    }`;
  const data = GrapQLrequest({
    query,
    variables: {
      folderId,
    },
  });

  return data;
};
export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
  note(noteId: $noteId) {
    id
    content
    
  }
}`;
  const data = GrapQLrequest({
    query,
    variables: {
      noteId,
    },
  });
  return data;
};
export const addNewNote = async ({ params, request }) => {
  const query = `mutation Mutation($content: String, $folderId: ID) {
  addNote(content: $content, folderId: $folderId) {
    id
    content
  }
}
`;
  const newNote = await request.formData();
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));
  const { addNote } = await GrapQLrequest({ query, variables: formDataObj });
  console.log(addNote);
  return addNote;
};
export const updateNote = async ({ params, request }) => {
  const newNote = await request.formData();
  console.log(newNote);
  const formDataObj = {};
  newNote.forEach((value, key) => (formDataObj[key] = value));
  console.log("aaa", formDataObj);
  const query = `mutation Mutation($id: String, $content: String) {
  updateNote(id: $id, content: $content) {
    id,
    content
  }
}`;
  const { updateNote } = await GrapQLrequest({ query, variables: formDataObj });
  console.log(updateNote);
  return updateNote;
};
