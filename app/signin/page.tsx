"use client";

import { Button } from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log("signInData>", signInData);
    if (signInData?.error) {
      console.log(signInData?.error);
      toast.error("Incorrect email/password");
    } else {
      toast.success("Logged in");
      router.push("/admin");
    }
  };

  return (
    <article className="min-h-screen p-24">
      <h1 className="font-bold text-center text-3xl">Welcome</h1>
      <section className="grid mt-10 w-[30%] mx-auto gap-y-5">
        <input
          className="p-3 outline-none text-black rounded-lg"
          placeholder="Email"
          type="text"
          name="email"
          value={data?.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          className="p-3 outline-none text-black rounded-lg"
          placeholder="Password"
          type="password"
          name="password"
          value={data?.password}
          onChange={(e) => handleChange(e)}
        />
        <Button
          color="primary"
          className="text-lg font-semibold"
          onPress={handleSubmit}
        >
          Login
        </Button>
      </section>
      {session?.user && (
        <h1 className="text-white text-6xl">USER IS LOGGED IN</h1>
      )}
    </article>
  );
}
