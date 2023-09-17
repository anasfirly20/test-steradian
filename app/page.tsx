import Link from "next/link";

export default function Home() {
  return (
    <article className="min-h-screen p-24">
      <Link href="/api/auth/signin">GO TO SIGN IN</Link>
    </article>
  );
}
