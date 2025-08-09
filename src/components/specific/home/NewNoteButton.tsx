"use client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { createNoteAction } from "@/actions/notes";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const titleSuccess = "New Note Created";
  const descriptionSuccess = "You have crearted a new note";
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);

      toast.success(titleSuccess, {
        description: descriptionSuccess,
        duration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}
export default NewNoteButton;
