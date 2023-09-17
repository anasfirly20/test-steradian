import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <article className="min-h-screen p-24 flex flex-col gap-10">
      <Link href="/api/auth/signin">GO TO SIGN IN</Link>
      <Link href="/admin" className="hover:opacity-80 w-fit">
        Go To Dashboard
      </Link>
      {session?.user && <h1>asda</h1>}
    </article>
  );
}
