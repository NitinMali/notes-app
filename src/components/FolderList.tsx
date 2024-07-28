import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addFolder, setSelectedFolder } from "../store/foldersSlice";
import { createNote } from "../store/notesSlice";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  IconButton,
  Badge,
  Flex,
  Text,
  Spacer,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const FolderList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const folders = useSelector((state: RootState) =>
    state.folders.folders.filter((folder) => folder.username === "JOHN")
  );

  const notes = useSelector((state: RootState) =>
    state.notes.notes.filter((note) => note.username === "JOHN")
  );

  const selectedFolder = useSelector(
    (state: RootState) => state.folders.selectedFolder
  );

  return (
    <>
      <Tabs position="relative" variant="unstyled">
        <TabList mb="1em">
          <Tab>My note</Tab>
          <Tab>Shared with me</Tab>
        </TabList>
        <TabIndicator mt={-3} height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel border="1px" borderColor="gray.200" borderRadius="5px">
            <Flex mb={2}>
              <Heading size="md">Folders</Heading>
              <Spacer />
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="teal"
                aria-label="Done"
                fontSize="12px"
                size="xs"
                icon={<AddIcon />}
                onClick={() => {
                  const newFolderID = Date.now();
                  dispatch(
                    addFolder({
                      id: newFolderID,
                      title: `New Folder ${folders.length + 1}`,
                      username: "JOHN",
                    })
                  );
                  dispatch(createNote(false));
                }}
              />
            </Flex>
            <Divider mb={2} />
            <List as="ul" overflow="hidden">
              {folders.map((folder, key) => (
                <div key={key}>
                  <ListItem
                    p={2}
                    _hover={{ bg: "gray.100" }}
                    className={
                      selectedFolder?.id === folder.id ? "selected" : ""
                    }
                  >
                    <Flex>
                      <Text
                        cursor="pointer"
                        onClick={() => {
                          dispatch(createNote(false));
                          dispatch(setSelectedFolder(folder));
                          navigate("/");
                        }}
                      >
                        {folder.title}
                      </Text>
                      <Spacer />
                      <Badge color="black" borderRadius="5px">
                        {
                          notes.filter((note) => note.folderId == folder.id)
                            .length
                        }
                      </Badge>
                    </Flex>
                  </ListItem>
                  <Divider />
                </div>
              ))}
              {folders.length === 0 && (
                <Alert status="error" mt={2}>
                  <AlertIcon />
                  Let's start by creating your first folder to organize your new
                  notes
                </Alert>
              )}
            </List>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default FolderList;
