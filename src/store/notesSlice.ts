import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: number;
  title: string;
  content: string;
  folderId?: number;
  username: string;
}

export interface NoteInput {
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
  selectedNote?: Note | null;
  noteToEdit: Note | null;
  createNote: boolean;
}

const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  noteToEdit: null,
  createNote: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload);
    },
    updateNote(state, action: PayloadAction<{ id: number; note: NoteInput }>) {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], ...action.payload.note };
      }
    },
    deleteNote(state, action: PayloadAction<number>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setSelectedNote(state, action: PayloadAction<Note | null>) {
      state.createNote = false;
      state.selectedNote = action.payload;
    },
    setNoteToEdit(state, action: PayloadAction<Note | null>) {
      state.noteToEdit = action.payload;
    },
    createNote(state, action: PayloadAction<boolean>) {
      state.createNote = action.payload;
    },
  },
});

export const {
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setSelectedNote,
  setNoteToEdit,
  createNote,
} = notesSlice.actions;

export default notesSlice.reducer;
