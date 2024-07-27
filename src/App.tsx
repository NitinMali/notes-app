import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { setNotes } from "./store/notesSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import { Box } from "@chakra-ui/react";

//autosave button spinner and directy check
//autosave on view change

const App: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const createNote = useSelector((state: RootState) => state.notes.createNote);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    dispatch(setNotes(savedNotes));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="app">
      <Header />
      <Box display="flex" justifyContent="space-between" m={4}>
        <Box width="20%">
          <NoteList />
        </Box>
        <Box
          width="75%"
          display="flex"
          flexDirection="column"
          height="calc(100vh - 200px)"
        >
          {createNote ? <NoteForm /> : <NoteDetail />}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default App;
