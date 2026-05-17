import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { NotesResponse } from "./clientApi";

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  filter?: string
): Promise<NotesResponse> => {
  const cookieStore = await cookies();


  const { data } = await nextServer.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag: filter || undefined,
    },
    headers: { Cookie: cookieStore.toString()
    },
  });

  return data;
};

export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const cookieStore = await cookies();


  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
     headers: { Cookie: cookieStore.toString() },
  });

  return data;
};




export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};


export const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });

  return res;
};
