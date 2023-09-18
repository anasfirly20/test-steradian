"use client";

// Components
import Link from "next/link";

// Next auth
import { signIn, signOut, useSession } from "next-auth/react";

// Miscellaneous
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  };

  return (
    <nav className="py-6 px-[10vw] flex justify-between items-center">
      <Link href="/">
        <Icon
          icon="clarity:home-line"
          fontSize={30}
          className="hover:opacity-80"
        />
      </Link>
      {session?.user ? (
        <Button
          size="md"
          color="primary"
          variant="bordered"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      ) : (
        <Link href="/sign-in">
          <Button size="md" color="primary" variant="solid">
            Sign In
          </Button>
        </Link>
      )}
    </nav>
  );
}
