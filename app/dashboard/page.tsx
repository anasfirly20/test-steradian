"use client";

// Api
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/routes/users";
import { useSession } from "next-auth/react";
import { getAllOrders } from "@/api/routes/orders";
import OrderTable from "./components/OrderTable";

export default function UsersPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: dataOrder } = useQuery(["ordersData"], getAllOrders);

  console.log("parent>>", dataOrder);

  return (
    <div className="min-h-screen">
      <h1>Welcome to the dashboard!</h1>
      <h1 className="text-xl">Admin - {session?.user?.username}</h1>
      <OrderTable data={dataOrder} />
    </div>
  );
}
