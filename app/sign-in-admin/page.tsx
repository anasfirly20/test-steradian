"use client";

import { ChangeEvent, useState } from "react";

// Next ui
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

// Components
import CustomInput from "../components/CustomInput";

// Miscellaneous
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
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <article className="min-h-screen p-24">
      <h1 className="font-bold text-center text-3xl">Admin login</h1>
      <form
        onSubmit={handleSubmit}
        className="grid mt-10 w-[30%] mx-auto gap-y-5"
      >
        <CustomInput
          placeholder="Email"
          type="email"
          name="email"
          value={data?.email}
          onChange={(e) => handleChange(e)}
        />
        <CustomInput
          placeholder="Password"
          type="password"
          name="password"
          value={data?.password}
          onChange={(e) => handleChange(e)}
        />
        <Button
          color="primary"
          variant="ghost"
          className="text-lg font-semibold"
          type="submit"
        >
          Login
        </Button>
      </form>
    </article>
  );
}
