import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { deleteNote } from "../store/notesSlice";
import { Box, Heading, useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CustomAlertDialog from "./shared/ConfirmAlertDialog";
import "react-quill/dist/quill.snow.css";

const NoteDetail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  const noteId = id ? parseInt(id) : undefined;

  const note = useSelector((state: RootState) =>
    state.notes.notes.find((note) => note.id === noteId)
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDialog = () => {
    if (noteId) {
      dispatch(deleteNote(noteId));
    }
    setIsDialogOpen(false);
    toast({
      title: "Deleted",
      description: "Note deleted successfully",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    navigate("/")
  };

  if (!note) {
    return <Box>Please select note to view</Box>;
  }

  return (
    note && (
      <>
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
            <EditIcon
              onClick={() => navigate(`/form/${noteId}`)}
              cursor="pointer"
              color="blue"
            />
            <DeleteIcon
              color={"red"}
              cursor="pointer"
              ml={2}
              onClick={handleOpenDialog}
            />
          </Box>
        </Box>
        <Box flex="1" p={4} overflow="auto">
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </Box>
        {/* <Box display="flex" justifyContent="space-between" bg="gray.100">
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
        </Box> */}
      </Box>
      <CustomAlertDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title="Delete note?"
        description="Are you sure you want to delete this note?"
        confirmText="Delete"
        cancelText="Cancel"
      />
      </>
    )
  );
};

export default NoteDetail;
