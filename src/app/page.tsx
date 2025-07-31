import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import AskAIButton from "@/components/specific/home/AskAIButton";
import NewNoteButton from "@/components/specific/home/NewNoteButton";
import NoteTextInput from "@/components/specific/home/NoteTextInput";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const user = await getUser();
  const noteIdParam = (await searchParams).noteId;
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user?.id,
    },
  });

  const allNotes = await prisma.note.findMany();
  console.log("all note in db", allNotes);

  return (
    <div className="flex h-full flex-col items-center gap-4 border-2 border-white">
      <div className="flex w-full max-w-4xl justify-end gap-2 border-2 border-amber-400">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
}
