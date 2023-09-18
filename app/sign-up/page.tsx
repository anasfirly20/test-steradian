"use client";

import { ChangeEvent, useState } from "react";

// Components
import CustomInput from "../components/CustomInput";
import { Button } from "@nextui-org/react";

// Api
import { useMutation } from "@tanstack/react-query";
import { PostUser } from "@/api/routes/users";

const initialValues = {
  username: "",
  password: "",
  email: "",
  phone: "",
  city: "",
  zip: "",
  message: "",
  address: "",
};

export default function SignUpPage() {
  const [data, setData] = useState(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "zip") {
      setData({ ...data, [name.toString()]: Number(value) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("data >>", data);
  };

  return (
    <article className="min-h-screen p-24">
      <h1 className="font-bold text-center text-3xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 mt-10 w-[60%] mx-auto gap-x-5 gap-y-5"
      >
        <CustomInput
          placeholder="Username"
          type="text"
          name="username"
          value={data?.username}
          onChange={(e) => handleChange(e)}
        />
        <CustomInput
          placeholder="Password"
          type="password"
          name="password"
          value={data?.password}
          onChange={(e) => handleChange(e)}
        />
        <CustomInput
          placeholder="Email"
          type="email"
          name="email"
          value={data?.email}
          onChange={(e) => handleChange(e)}
        />
        <CustomInput
          placeholder="Phone Number"
          type="text"
          name="phone"
          value={data?.phone}
          onChange={(e) => handleChange(e)}
        />
        <CustomInput
          placeholder="City"
          type="text"
          name="city"
          value={data?.city}
          onChange={(e) => handleChange(e)}
        />
        <CustomInput
          placeholder="Zip Code"
          type="number"
          name="zip"
          value={data?.zip}
          onChange={(e) => handleChange(e)}
        />
        <CustomInput
          placeholder="Address"
          type="text"
          name="address"
          value={data?.address}
          onChange={(e) => handleChange(e)}
        />
        <textarea
          rows={4}
          cols={50}
          className="p-3 outline-none text-black rounded-lg w-full col-span-2"
          name="message"
          value={data?.message}
          placeholder="Enter your message"
          onChange={(e) => handleChange(e)}
        />
        <Button color="primary" className="text-lg font-semibold" type="submit">
          Sign Up
        </Button>
      </form>
    </article>
  );
}
