"use client";
import { SearchIcon } from "lucide-react";
import { SidebarGroupContent as SidebarGroupContentShadCN } from "../ui/sidebar";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Note } from "@prisma/client";
import { Input } from "../ui/input";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";

type Props = {
  notes: Note[];
};

function SidebarGroupContentCustomComponent({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId),
    );
  };

  console.log(
    "notes displayed in side bar are in SidebarGroupContent Component",
    notes,
  );
  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search your notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />
            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
}
export default SidebarGroupContentCustomComponent;
