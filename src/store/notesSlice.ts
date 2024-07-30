import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: number;
  title: string;
  content: string;
  folderId?: number;
  username: string;
  share?: string[];
  lockedBy?: string | null;
}

export interface NoteInput {
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
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
    updateShare(state, action: PayloadAction<{ id: number; share: string[] }>) {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], share: action.payload.share };
      }
    },

    toggleLock(state, action: PayloadAction<{ id: number, lockedBy: string | null }>) {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = { ...state.notes[index], lockedBy: action.payload.lockedBy };
      }
    },

    deleteNote(state, action: PayloadAction<number>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { setNotes, addNote, updateNote, deleteNote, updateShare, toggleLock } = notesSlice.actions;

export default notesSlice.reducer;
