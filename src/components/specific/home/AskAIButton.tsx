"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useRef, Fragment } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAboutNotesAction } from "@/actions/notes";
import "@/styles/ai-response.css";

type Props = {
  user: User | null;
};

function AskAIButton({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        // every time we open the dialogue, we will reset the questions and reponses
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
    }
    setOpen(isOpen);
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!questionText.trim()) return;
    const newQuestion = questionText;
    const updatedQuestions = [...questions, newQuestion];

    setQuestions(updatedQuestions);
    setQuestionText("");

    startTransition(async () => {
      try {
        const aiResponse = await askAIAboutNotesAction(
          [...questions, questionText],
          responses,
        );

        setResponses((prev) => [...prev, aiResponse]);
        scrollToBottom();
      } catch (error) {
        console.error(error);
        setResponses((prev) => [...prev, "Something went wrong."]);
      }
    });
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Ask Ai</Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] dark:bg-[oklch(0.3_0.04_265.755)]"
          ref={contentRef}
        >
          <DialogHeader>
            <DialogTitle>Ask AI About Your Notes</DialogTitle>
            <DialogDescription>
              Our AI can answer questions about all of your notes
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-8">
            {questions.map((question, index) => (
              <Fragment key={index}>
                <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                  {question}
                </p>
                {responses[index] && (
                  <p
                    className="bot-response text-muted-foreground text-sm"
                    dangerouslySetInnerHTML={{ __html: responses[index] }}
                  />
                )}
              </Fragment>
            ))}
            {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
          </div>

          <div
            className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
            onClick={handleClickInput}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Ask me anything about your notes..."
              className="placeholder:text-muted-foreground resize-none rounded-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{
                minHeight: "0",
                lineHeight: "normal",
              }}
              rows={1}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <Button
              type="button"
              onClick={handleSubmit}
              className="ml-auto size-8 rounded-full"
            >
              <ArrowUpIcon className="text-background" />
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default AskAIButton;
