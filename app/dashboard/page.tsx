"use client";

// Api
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/routes/users";
import { useSession } from "next-auth/react";
import { getAllOrders } from "@/api/routes/orders";
import OrderTable from "./components/OrderTable";
import UserTable from "./components/UserTable";

export default function UsersPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: dataOrders, isLoading: isLoadingOrders } = useQuery(
    ["ordersData"],
    getAllOrders
  );
  const { data: dataUsers, isLoading: isLoadingUsers } = useQuery(
    ["usersData"],
    getAllUsers
  );

  console.log("dataUSers>>", dataUsers);

  return (
    <div className="min-h-screen">
      <h1>Welcome to the dashboard!</h1>
      <h1 className="text-xl">Admin - {session?.user?.username}</h1>
      <section className="space-y-20">
        <OrderTable data={dataOrders} isLoading={isLoadingOrders} />
        <UserTable data={dataUsers} isLoading={isLoadingUsers} />
      </section>
    </div>
  );
}
