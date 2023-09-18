"use client";

import { Icon } from "@iconify/react";

type TProps = {
  icon: string;
  fontSize: number;
  className: string;
};

export default function CustomIcon({ icon, fontSize, className }: TProps) {
  return <Icon icon={icon} fontSize={fontSize} className={className} />;
}
