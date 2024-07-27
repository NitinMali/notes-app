export interface Note {
  id: number;
  title: string;
  content: string;
}

export type NoteInput = Omit<Note, "id">;
