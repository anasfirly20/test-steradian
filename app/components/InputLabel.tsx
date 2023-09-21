"use client";
import { Input } from "@nextui-org/input";
import { ChangeEvent } from "react";

type TProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
};

export default function InputLabel({
  label,
  type,
  name,
  value,
  onChange,
  isInvalid,
}: TProps) {
  return (
    <section className="grid">
      <label className={`text-sm ml-1 ${isInvalid && "text-[#d51757]"}`}>
        {label}
      </label>
      <Input
        variant="underlined"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      />
    </section>
  );
}
