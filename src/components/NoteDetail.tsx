import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setNoteToEdit, deleteNote } from "../store/notesSlice";
import { Box, Heading, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import "react-quill/dist/quill.snow.css";

const NoteDetail: React.FC = () => {
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) => state.notes.selectedNote);

  return (
    note && (
      <Box display="flex" flexDirection="column" height="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          bg="gray.100"
          p={4}
          mb={2}
        >
          <Heading size="md">{note.title}</Heading>
          <Box p={2}>
            <EditIcon onClick={() => dispatch(setNoteToEdit(note))} />
            <ExternalLinkIcon
              ml={2}
              onClick={() => dispatch(deleteNote(note.id))}
            />
          </Box>
        </Box>
        <Box flex="1" p={4} overflow="auto">
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </Box>
        <Box display="flex" justifyContent="space-between" bg="gray.100">
          <Text p={2}>
            <b>Created:</b> 22nd July 2024 by Nitin Mali
          </Text>
          <Box p={2}>
            <EditIcon onClick={() => dispatch(setNoteToEdit(note))} />
            <DeleteIcon
              color={"red"}
              ml={2}
              onClick={() => dispatch(deleteNote(note.id))}
            />
          </Box>
        </Box>
      </Box>
    )
  );
};

export default NoteDetail;
