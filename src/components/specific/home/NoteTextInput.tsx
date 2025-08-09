"use client";

import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import { debounceTimeout } from "@/lib/constants";
import { useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setNoteText } from "@/store/noteSlice";
import { updateNoteAction } from "@/actions/notes";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";

  const dispatch = useDispatch();
  const noteText = useSelector((state: RootState) => state.note.noteText);

  useEffect(() => {
    if (noteIdParam === noteId) {
      dispatch(setNoteText(startingNoteText));
    }
  }, [startingNoteText, noteIdParam, noteId, dispatch]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    dispatch(setNoteText(text));

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, debounceTimeout);
  };

  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type your note here..."
      className="custom-scrollbar placeholder:text-muted-foreground mb-4 h-full max-w-4xl resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}
export default NoteTextInput;
