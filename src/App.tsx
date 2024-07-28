import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setNotes } from "./store/notesSlice";
import { setFolders } from "./store/foldersSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FolderList from "./components/FolderList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import NoteGrid from "./components/NoteGrid";
import { Box, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

//autosave button spinner and directy check
//autosave on view change

const App: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const folders = useSelector((state: RootState) => state.folders.folders);
  
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

  return (
    <Router>
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
              <Route path="/" element={<NoteGrid />} />
              <Route path="/view/:id" element={<NoteDetail />} />
              <Route path="/form/:id?" element={<NoteForm />} />
            </Routes>
          </Box>
        </Box>
        <Footer />
      </Flex>
    </Router>
  );
};

export default App;
