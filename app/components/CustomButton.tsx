"use client";

// next ui
import { Button } from "@nextui-org/react";

type TProps = {
  onPress: () => void;
  size: "lg" | "sm" | "md";
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  label: string;
};

export default function CustomButton({ onPress, size, color, label }: TProps) {
  return (
    <Button size={size} color={color} onPress={onPress}>
      {label}
    </Button>
  );
}
