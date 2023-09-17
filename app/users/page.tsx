"use client";

// Api
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/routes/users";

export default function UsersPage() {
  const { data = [], isLoading } = useQuery<TGETUsers[]>(["usersData"], () =>
    getAllUsers()
  );

  console.log("DATA>>", data);

  return (
    <div className="min-h-screen">
      <h1>LOOOK</h1>
      {data?.map((user) => {
        return <h1 key={user?.id}>{user?.email}</h1>;
      })}
      <h1>HELLO</h1>
    </div>
  );
}
