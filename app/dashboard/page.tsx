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

  // GET users
  const { data: dataUsers, isLoading: isLoadingUsers } = useQuery(
    ["usersData"],
    getAllUsers
  );

  // GET orders
  const { data: dataOrders, isLoading: isLoadingOrders } = useQuery(
    ["ordersData"],
    getAllOrders
  );

  console.log("dataUSers>>", dataUsers);

  return (
    <div className="min-h-screen">
      <h1>Welcome to the dashboard!</h1>
      <h1 className="text-xl">Admin - {session?.user?.username}</h1>
      <section className="space-y-20">
        <UserTable data={dataUsers} isLoading={isLoadingUsers} />
        <OrderTable data={dataOrders} isLoading={isLoadingOrders} />
      </section>
    </div>
  );
}
