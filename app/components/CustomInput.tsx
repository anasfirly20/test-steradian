import { ChangeEventHandler } from "react";

type TProps = {
  placeholder: string;
  type: string;
  name: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function CustomInput({
  placeholder,
  type,
  name,
  value,
  onChange,
}: TProps) {
  return (
    <>
      <input
        className="p-3 outline-none text-black rounded-lg"
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}
