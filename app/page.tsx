import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <article className="min-h-screen flex justify-center items-center">
      {session?.user ? (
        <section className="flex flex-col justify-center items-center">
          <h1 className="text-7xl">Welcome! {session?.user?.username}</h1>
          <Link href="/orders" className="hover:opacity-80 mt-10">
            Go To Orders
          </Link>
        </section>
      ) : (
        <section className="flex flex-col justify-center items-center">
          <Link href="/sign-in" className="hover:opacity-80">
            Please sign in to access
          </Link>
        </section>
      )}
    </article>
  );
}
