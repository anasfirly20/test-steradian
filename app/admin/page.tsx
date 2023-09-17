"use client";

// next auth
import { signOut, useSession } from "next-auth/react";

// next ui
import { Button } from "@nextui-org/button";

export default function AdminPage() {
  const handleSignOut = () => {};

  return (
    <div>
      <h1>Admin Page</h1>
      <Button size="lg" color="primary" onPress={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}
