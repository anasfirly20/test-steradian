"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-6 px-[10vw] flex justify-between items-center">
      <Link href="/">
        <Icon
          icon="clarity:home-line"
          fontSize={30}
          className="hover:opacity-80"
        />
      </Link>
      <h1>NAVBAAR</h1>
    </nav>
  );
}
