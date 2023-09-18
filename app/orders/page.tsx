"use client";

// Api
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/api/routes/orders";
import OrderTable from "./components/OrderTable";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session } = useSession();

  const { data = [], isLoading } = useQuery<TGETUsers[]>(["usersData"], () =>
    getAllOrders()
  );

  //   console.log("DATA>>", data);
  console.log("session>>", session);

  return (
    <section className="min-h-screen">
      <OrderTable />
    </section>
  );
}
