import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setNotes } from "../store/notesSlice";
import { useNavigate, useParams } from "react-router-dom";
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
  Input,
  Box,
} from "@chakra-ui/react";

import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import CustomAlertDialog from "./shared/ConfirmAlertDialog";
import {
  deleteFolder,
  setSelectedFolder,
  updateFolder,
} from "../store/foldersSlice";

const NoteGrid: React.FC = () => {
  const [editFolder, setEditFolder] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  const folderId = id ? parseInt(id) : undefined;

  const { username, folders: allFolders } = useSelector(
    (state: RootState) => state.folders
  );
  const folders = allFolders.filter((folder) => folder.username === username);
  const selectedFolder = allFolders.find((folder) => folder.id === folderId);

  const notes = useSelector((state: RootState) =>
    state.notes.notes.filter((note) => note.folderId == selectedFolder?.id)
  );

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
            {!editFolder && (
              <>
                <Heading size="md" mt={3}>
                  {selectedFolder.title}
                </Heading>
                <EditIcon
                  ml={4}
                  mt={4}
                  cursor="pointer"
                  color="blue"
                  onClick={() => {
                    setEditFolder(true);
                    if (selectedFolder?.title) {
                      setFolderTitle(selectedFolder.title);
                    }
                  }}
                />
              </>
            )}

            {editFolder && (
              <>
                <Input
                  value={folderTitle}
                  mt={3}
                  w="30%"
                  onChange={(e) => setFolderTitle(e.target.value)}
                />
                <CheckIcon
                  mt={6}
                  mx={4}
                  boxSize={4}
                  cursor="pointer"
                  color="blue"
                  onClick={() => {
                    dispatch(
                      updateFolder({
                        id: selectedFolder.id,
                        folder: { title: folderTitle },
                      })
                    );
                    setEditFolder(false);
                  }}
                />
                <CloseIcon
                  cursor="pointer"
                  mt={6}
                  color="blue"
                  boxSize={4}
                  onClick={() => setEditFolder(false)}
                />
              </>
            )}

            <Spacer />
            {!editFolder && (
              <>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  variant="outline"
                  mr={2}
                  onClick={() => navigate("/form")}
                >
                  Note
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="blue"
                  variant="solid"
                  onClick={handleOpenDialog}
                >
                  Delete Folder
                </Button>
              </>
            )}
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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: note.content.substring(0, 200).concat(' ...'),
                    }}
                  />
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
