"use client";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import { SidebarMenuButton } from "../ui/sidebar";
import Link from "next/link";

type Props = {
  note: Note;
};

function SelectNoteButton({ note }: Props) {
  const noteId = useSearchParams().get("noteId") || "";
  const selectedNoteText = useSelector(
    (state: RootState) => state.note.noteText,
  );
  const [localNoteText, setLocalNoteText] = useState(note.text);
  const [shouldBeGlobalNoteText, setShouldBeGlobalNoteText] = useState(false);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldBeGlobalNoteText(true);
    } else {
      setShouldBeGlobalNoteText(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldBeGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldBeGlobalNoteText]);

  const blankNoteText = "EMPTY NOTE";
  let noteText = localNoteText || blankNoteText;

  if (shouldBeGlobalNoteText) {
    noteText = selectedNoteText || blankNoteText;
  }

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}
    >
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
        <p className="w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {noteText}
        </p>
        <p className="text-muted-foreground text-xs">
          {note.updatedAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  );
}
export default SelectNoteButton;
