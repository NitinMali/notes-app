import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addFolder, setSelectedFolder } from "../store/foldersSlice";
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

import { AddIcon } from "@chakra-ui/icons";

const FolderList: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    username,
    selectedFolder,
    folders: allFolders,
  } = useSelector((state: RootState) => state.folders);
  const folders = allFolders.filter((folder) => folder.username === username);

  const notes = useSelector((state: RootState) =>
    state.notes.notes.filter((note) => note.username === username)
  );

  return (
    <>
      <Tabs
        position="relative"
        variant="unstyled"
        onChange={(index) => {
          setTabIndex(index);
          if (index == 1) {
            navigate("/shared");
          } else {
            if(folders[0]) {
              navigate(`/${folders[0].id}`);
            }
          }
        }}
      >
        <TabList mb="1em">
          <Tab>My note</Tab>
          <Tab>Shared with me</Tab>
        </TabList>
        <TabIndicator mt={-3} height="2px" bg="blue.500" borderRadius="1px" />
        <Flex mb={2}>
          <Heading size="md">Folders</Heading>
          <Spacer />
          {tabIndex == 0 && (
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="blue"
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
                    username: username ? username : "",
                  })
                );
              }}
            />
          )}
        </Flex>
        <TabPanels>
          <TabPanel border="1px" borderColor="gray.200" borderRadius="5px">
            <List as="ul" overflow="hidden">
              {folders.map((folder, key) => (
                <div key={key}>
                  <ListItem
                    p={2}
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                    onClick={() => {
                      dispatch(setSelectedFolder(folder));
                      navigate(`/${folder.id}`);
                    }}
                    className={
                      selectedFolder?.id === folder.id ? "selected" : ""
                    }
                  >
                    <Flex>
                      <Text>{folder.title}</Text>
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
          <TabPanel border="1px" borderColor="gray.200" borderRadius="5px">
            <List as="ul" overflow="hidden">
              <ListItem
                p={2}
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
                onClick={() => {
                  navigate("/shared");
                }}
                className={tabIndex == 1 ? "selected" : ""}
              >
                <Flex>
                  <Text>Shared</Text>
                </Flex>
              </ListItem>
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default FolderList;
