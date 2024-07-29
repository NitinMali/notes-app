import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setNotes } from "./store/notesSlice";
import { setFolders, setSelectedFolder } from "./store/foldersSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FolderList from "./components/FolderList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import NoteGrid from "./components/NoteGrid";
import { Box, Flex } from "@chakra-ui/react";
import useSessionUsername from "./useSessionUsername";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./styles.css";

//autosave button spinner and directy check
//autosave on view change

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const folders = useSelector((state: RootState) => state.folders.folders);
  const username = useSelector(
    (state: RootState) => state.folders.currentUsername
  );

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    dispatch(setNotes(savedNotes));

    const savedFolders = JSON.parse(localStorage.getItem("folders") || "[]");
    dispatch(setFolders(savedFolders));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    const foldersByUsername = folders.filter(folder=>folder.username === username);
    if (foldersByUsername[0]) {
      dispatch(setSelectedFolder(foldersByUsername[0]));
      navigate(`/${foldersByUsername[0].id}`);
    }
  }, [username]);

  return (
    <Flex direction="column">
      <Header />
      <Box
        display="flex"
        justifyContent="space-between"
        height="100%"
        m={4}
        flex={1}
      >
        <Box width="20%">
          <FolderList />
        </Box>
        <Box
          width="78%"
          display="flex"
          flexDirection="column"
          minHeight="calc(100vh - 200px)"
        >
          <Routes>
            <Route path="/:id?" element={<NoteGrid />} />
            <Route path="/view/:id" element={<NoteDetail />} />
            <Route path="/form/:id?" element={<NoteForm />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default App;
