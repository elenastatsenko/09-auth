import { nextServer } from "./api";
import type { Note, ValuesFormProps } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  filter?: string | undefined,
): Promise<NotesResponse> => {
  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag: filter || undefined,
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: ValuesFormProps): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
