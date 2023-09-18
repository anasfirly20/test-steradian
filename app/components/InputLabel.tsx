"use client";
import { Input } from "@nextui-org/input";
import { ChangeEvent } from "react";

type TProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function InputLabel({
  label,
  type,
  name,
  value,
  onChange,
}: TProps) {
  return (
    <section className="grid">
      <label className="text-sm ml-1">{label}</label>
      <Input
        variant="underlined"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </section>
  );
}
