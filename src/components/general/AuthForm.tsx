"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { start } from "repl";
import { loginAction, signUpAction } from "@/actions/users";

type Props = {
  type: "login" | "signup";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    console.log("form submitted");

    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        const { errorMessage: loginError } = await loginAction(email, password);
        errorMessage = loginError;
        title = "Logged in";
        description = "You have been successfully logged in";
      } else {
        const { errorMessage: signupError } = await signUpAction(
          email,
          password,
        );
        errorMessage = signupError;
        title = "Signed up";
        description = "Check your email for confirmation link";
      }

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success(title, {
          description,
          duration: 3000,
        });
        router.replace("/");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          ></Input>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          ></Input>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-sm">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`ml-2 text-blue-500 hover:underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign up" : "Log in"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}
export default AuthForm;
