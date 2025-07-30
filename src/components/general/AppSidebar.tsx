import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { getUser } from "@/auth/server";
import { Note } from "@prisma/client";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import SidebarGroupContentCustomComponent from "@/components/general/SidebarGroupContentCustomComponent";

async function AppSidebar() {
  const user = await getUser();
  let notes: Note[] = [];

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return (
    <Sidebar>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="mt-4 mb-2 text-lg">
            {user ? (
              `Your Notes (${notes.length})`
            ) : (
              <p className="">
                Log in{" "}
                <Link href="/login" className="underline">
                  here
                </Link>{" "}
                To see your notes.
              </p>
            )}
          </SidebarGroupLabel>
          {user && <SidebarGroupContentCustomComponent notes={notes} />}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
