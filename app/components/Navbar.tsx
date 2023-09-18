"use client";

// Components
import Link from "next/link";

// Next auth
import { signOut, useSession } from "next-auth/react";

// Miscellaneous
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();

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
      {session?.user && (
        <Button
          size="md"
          color="primary"
          variant="bordered"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      )}
      {!session?.user && !path.includes("sign-in") && (
        <Link
          href="/sign-in"
          className="bg-[#0070ef] text-white font-semibold p-2 px-4 text-base rounded-lg"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
}
