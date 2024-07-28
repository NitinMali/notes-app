import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Folder {
  id: number;
  title: string;
  username: string;
}

export interface FolderInput {
  title: string;
}

interface FoldersState {
  folders: Folder[];
  selectedFolder?: Folder;
  folderToEdit: Folder | null;
}

const initialState: FoldersState = {
  folders: [],
  selectedFolder: undefined,
  folderToEdit: null,
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders(state, action: PayloadAction<Folder[]>) {
      state.folders = action.payload;
    },
    addFolder(state, action: PayloadAction<Folder>) {
      state.folders.push(action.payload);
    },
    updateFolder(state, action: PayloadAction<{ id: number; folder: FolderInput }>) {
      const index = state.folders.findIndex(
        (folder) => folder.id === action.payload.id
      );
      if (index !== -1) {
        state.folders[index] = { ...state.folders[index], ...action.payload.folder };
      }
    },
    deleteFolder(state, action: PayloadAction<number>) {
      state.folders = state.folders.filter((folder) => folder.id !== action.payload);
    },
    setSelectedFolder(state, action: PayloadAction<Folder | undefined>) {
      state.selectedFolder = action.payload;
    },
    setFolderToEdit(state, action: PayloadAction<Folder | null>) {
      state.folderToEdit = action.payload;
    },
  },
});

export const {
  setFolders,
  addFolder,
  updateFolder,
  deleteFolder,
  setSelectedFolder,
  setFolderToEdit,
} = foldersSlice.actions;

export default foldersSlice.reducer;
