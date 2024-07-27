import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSelectedNote, createNote } from "../store/notesSlice";
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
  Button,
  Badge,
  Flex,
  Text,
  Spacer,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const NoteList: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const selectedNote = useSelector(
    (state: RootState) => state.notes.selectedNote
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
          <TabPanel border="1px" borderColor="gray.200">
            <List as="ul" overflow="hidden">
              {notes.map((note) => (
                <>
                  <ListItem key={note.id} p={2} _hover={{ bg: "gray.100" }}>
                    <Flex>
                      <Text
                        cursor="pointer"
                        onClick={() => dispatch(setSelectedNote(note))}
                      >
                        {note.title}
                      </Text>
                      <Badge colorScheme='green' borderRadius="5px" ml={1}>20</Badge>
                      <Spacer />
                      <EditIcon cursor="pointer" />
                      <DeleteIcon cursor="pointer" ml={3}/>
                    </Flex>
                  </ListItem>
                  <Divider />
                </>
              ))}
              {notes.length === 0 && (
                <ListItem>
                  You haven't created any notes yet. Please click '+' button to
                  create new note.
                </ListItem>
              )}
            </List>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="outline"
        mt={6}
        p={2}
        onClick={() => dispatch(createNote())}
      >
        Folder
      </Button>
    </>
  );
};

export default NoteList;
