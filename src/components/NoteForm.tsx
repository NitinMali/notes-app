import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { addNote, updateNote } from "../store/notesSlice";
import {
  Box,
  Input,
  Button,
  Heading,
  Spacer,
  Flex,
  Divider,
  useToast,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const { id } = useParams<{ id: string }>();
  const noteId = id ? parseInt(id) : undefined;

  const {username, selectedFolder} = useSelector(
    (state: RootState) => state.folders
  );
  const noteToEdit = useSelector((state: RootState) =>
    state.notes.notes.find((note) => note.id === noteId)
  );

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [noteToEdit]);

  const handleSubmit = () => {
    if (noteToEdit) {
      dispatch(updateNote({ id: noteToEdit.id, note: { title, content } }));
      toast({
        title: "Success",
        description: "Note is updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return navigate(`/view/${noteId}`);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        username: username ? username : '',
        folderId: selectedFolder?.id,
      };
      dispatch(addNote(newNote));
      return navigate(`/${selectedFolder?.id}`);
    }
    setTitle("");
    setContent("");
  };

  return (
    <>
      <Flex mb={4}>
        <Heading size="md" mt={3}>
          Create New Note
        </Heading>
        <Spacer />
        <Button
          type="button"
          colorScheme="blue"
          variant="outline"
          mr={2}
          onClick={() => {
            noteId ? navigate(`/view/${noteId}`) : navigate(`/${selectedFolder?.id}`);
          }}
        >
          Cancel
        </Button>
        <Button type="button" colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
      <Divider mb={3} />
      <Box mt={4}>
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
      </Box>
    </>
  );
};

export default NoteForm;
