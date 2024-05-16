import React, { useEffect, useMemo, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "@mui/material";

export default function Note() {
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();

  // Khởi tạo trạng thái của editor
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  // Tạo rawHTML từ content node
  const [rawHTML, setRawHTML] = useState(note.content);
  // convertHTML : convert HTML ->contentBlock và entityMap (cấu trúc dữ liệu trong draft-js) dùng để tạo ra contentState để hiển thị và chỉnh sửa văn bản
  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;

      submit(
        { ...note, content: rawHTML },
        {
          method: "POST",
          action: pathname,
        }
      );
    }, 1000);
  }, []);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something!"
    />
  );
}
