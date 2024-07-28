import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSelectedNote, createNote, setNotes } from "../store/notesSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Text,
  SimpleGrid,
  Card,
  Alert,
  CardBody,
  CardFooter,
  Heading,
  Spacer,
  Flex,
  Divider,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CustomAlertDialog from "./shared/ConfirmAlertDialog";
import { deleteFolder, setSelectedFolder, Folder } from "../store/foldersSlice";

const NoteGrid: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const folders = useSelector((state: RootState) => state.folders.folders);

  const selectedFolder = useSelector(
    (state: RootState) => state.folders.selectedFolder
  );
  const notes = useSelector((state: RootState) =>
    state.notes.notes.filter((note) => note.folderId == selectedFolder?.id)
  );

  const selectedNote = useSelector(
    (state: RootState) => state.notes.selectedNote
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDialog = () => {
    if (selectedFolder) {
      const filteredNotes = notes.filter(
        (note) => note.folderId != selectedFolder.id
      );
      dispatch(setNotes(filteredNotes));
      dispatch(deleteFolder(selectedFolder.id));
      dispatch(setSelectedFolder(undefined));
    }
    setIsDialogOpen(false);
    toast({
      title: "Deleted",
      description: "Folder deleted successfully",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      {selectedFolder ? (
        <>
          <Flex mb={4}>
            <Heading size="md" mt={3}>
              {selectedFolder?.title}
              <EditIcon ml={2} cursor="pointer" />
            </Heading>
            <Spacer />
            <Button
              leftIcon={<AddIcon />}
              colorScheme="teal"
              variant="outline"
              mr={2}
              onClick={() => navigate("/form")}
            >
              Note
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="teal"
              variant="solid"
              onClick={handleOpenDialog}
            >
              Delete Folder
            </Button>
          </Flex>
          <Divider mb={3} />
          <SimpleGrid
            spacing={6}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {notes.map((note, key) => (
              <Card key={key}>
                <CardBody>
                  <Heading size="sx" pb={2}>
                    {note.title}
                  </Heading>
                  <div dangerouslySetInnerHTML={{ __html: note.content }} />
                </CardBody>
                <CardFooter>
                  <Button onClick={() => navigate(`/view/${note.id}`)}>
                    View
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>

          {notes.length === 0 && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              This folder is empty. Please click '+ Note' to start adding some
              notes.
            </Alert>
          )}
        </>
      ) : (
        folders.length > 0 && (
          <Alert status="error" mt={14}>
            <AlertIcon />
            Please choose folder from left to view notes
          </Alert>
        )
      )}

      <CustomAlertDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title="Delete folder?"
        description="Are you sure you want to delete this folder?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default NoteGrid;
