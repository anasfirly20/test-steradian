"use client";

import { ChangeEvent, useState } from "react";

// Next auth
import { signIn } from "next-auth/react";

// Next ui
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Miscellaneous
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast.error("Incorrect email/password");
    } else {
      toast.success("Logged in");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <article className="min-h-screen p-24">
      <h1 className="font-bold text-center text-3xl">Welcome</h1>
      <form
        onSubmit={handleSubmit}
        className="grid mt-10 w-[30%] mx-auto gap-y-5"
      >
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={data?.email}
          onChange={(e) => handleChange(e)}
          variant="underlined"
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={data?.password}
          onChange={(e) => handleChange(e)}
          variant="underlined"
        />
        <Button color="primary" className="text-lg font-semibold" type="submit">
          Login
        </Button>
      </form>
      <section className="flex justify-center items-center gap-2">
        <p className="text-center mt-3 text-sm">
          Don&apos;t have an account yet?
        </p>
        <Link
          href="/sign-up"
          className="text-sm self-end hover:opacity-80 text-[#0070ef]"
        >
          Sign Up
        </Link>
      </section>
    </article>
  );
}
