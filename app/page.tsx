"use client";

import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <article className="min-h-screen p-24">
      <h1 className="font-bold text-center text-3xl">Welcome !</h1>
      <section className="grid mt-10 w-[30%] mx-auto gap-y-5">
        <input
          className="p-3 outline-none text-black rounded-lg"
          placeholder="Email"
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          className="p-3 outline-none text-black rounded-lg"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <Button color="primary" className="text-lg font-semibold">
          Login
        </Button>
      </section>
    </article>
  );
}
