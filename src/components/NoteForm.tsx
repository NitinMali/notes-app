import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addNote, updateNote, setNoteToEdit } from "../store/notesSlice";
import { Box, Input, Button } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles.css";

const NoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const noteToEdit = useSelector((state: RootState) => state.notes.noteToEdit);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [noteToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteToEdit) {
      dispatch(updateNote({ id: noteToEdit.id, note: { title, content } }));
    } else {
      const newNote = { id: Date.now(), title, content };
      dispatch(addNote(newNote));
    }
    setTitle("");
    setContent("");
    dispatch(setNoteToEdit(null));
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={4}>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={4}
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className="editor-container"
        style={{
          border: "1px solid #dddddd",
          borderRadius: "5px",
          padding: "5px",
        }}
      />
      <Button type="submit" colorScheme="teal" mt={4}>
        Save
      </Button>
    </Box>
  );
};

export default NoteForm;
