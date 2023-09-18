"use client";

import { Input } from "@nextui-org/react";

export default function SignUpPage() {
  return (
    <article className="min-h-screen p-24">
      <form
        // onSubmit={handleSubmit}
        className="grid mt-10 w-[30%] mx-auto gap-y-5"
      >
        <Input label="Email" variant="bordered" className="text-black" />
      </form>
    </article>
  );
}
