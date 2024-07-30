import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { deleteNote, updateShare } from "../store/notesSlice";
import {
  Box,
  Heading,
  useToast,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, EmailIcon } from "@chakra-ui/icons";
import CustomAlertDialog from "./shared/ConfirmAlertDialog";
import "react-quill/dist/quill.snow.css";

const NoteDetail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  const noteId = id ? parseInt(id) : undefined;

  const note = useSelector((state: RootState) =>
    state.notes.notes.find((note) => note.id === noteId)
  );

  const { username } = useSelector((state: RootState) => state.folders);

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
    navigate("/");
  };

  const handleShare = (share: string[]) => {
    if (noteId) {
      dispatch(updateShare({ id: noteId, share }));
    }
    onClose();
  };

  if (!note) {
    return <Box>Please select note to view</Box>;
  }

  const ShareModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (users: string[]) => void;
    username?: string | null;
    shared?: string[];
  }> = ({ isOpen, onClose, username, onSubmit, shared = [] }) => {
    const [usernames, setUsernames] = useState<string[]>(shared);

    const handleToggleUsername = (username: string) => {
      setUsernames((prevUsernames) => {
        if (prevUsernames.includes(username)) {
          return prevUsernames.filter((u) => u !== username);
        } else {
          return [...prevUsernames, username];
        }
      });
    };

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Share this note with</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={2}>
                {username !== "John" && (
                  <Checkbox
                    isChecked={usernames.includes("John")}
                    onChange={(e) => handleToggleUsername("John")}
                  >
                    John
                  </Checkbox>
                )}
                {username !== "Amar" && (
                  <Checkbox
                    isChecked={usernames.includes("Amar")}
                    onChange={(e) => handleToggleUsername("Amar")}
                  >
                    Amar
                  </Checkbox>
                )}
                {username !== "Priya" && (
                  <Checkbox
                    isChecked={usernames.includes("Priya")}
                    onChange={(e) => handleToggleUsername("Priya")}
                  >
                    Priya
                  </Checkbox>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={() => onSubmit(usernames)}
              >
                Share
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

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
                color="red"
                cursor="pointer"
                ml={2}
                onClick={handleOpenDialog}
              />
              <EmailIcon
                color="blue"
                cursor="pointer"
                ml={2}
                onClick={onOpen}
              />
            </Box>
          </Box>
          <Box flex="1" p={4} overflow="auto">
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </Box>
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

        <ShareModal
          onClose={onClose}
          isOpen={isOpen}
          username={username}
          shared={note.share}
          onSubmit={handleShare}
        />
      </>
    )
  );
};

export default NoteDetail;
