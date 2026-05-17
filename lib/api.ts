import axios from "axios";
import type { Note, ValuesFormProps } from "@/types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  filter?: string | undefined
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag: filter || undefined,
    },
  });

  return data;
};

export const createNote = async (note: ValuesFormProps): Promise<Note> => {
  const response = await api.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
