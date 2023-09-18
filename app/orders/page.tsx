"use client";

// Api
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/api/routes/orders";
import OrderTable from "./components/OrderTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { data: session } = useSession();
  const { data: dataOrder } = useQuery(["ordersData"], getAllOrders);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    if (dataOrder && session?.user?.id) {
      const filteredOrders = dataOrder.filter(
        (order: { user: { id: string }; admin: { id: string } }) => {
          if (order.user?.id) {
            return order.user.id === session.user.id;
          } else {
            return order.admin?.id === session.user.id;
          }
        }
      );
      setOrdersData(filteredOrders);
    }
  }, [dataOrder, session]);

  return (
    <section className="min-h-screen">
      <h1 className="text-xl">Hello! {session?.user?.username}</h1>
      <p className="mb-5">
        {session?.user?.email} - {session?.user?.id}
      </p>
      <h1 className="text-center mb-5">Order details</h1>
      <OrderTable data={ordersData} />
    </section>
  );
}
