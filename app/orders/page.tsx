"use client";

// Api
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/api/routes/orders";

// Miscellaneous
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/use-disclosure";

// Components
import OrderModal from "./components/OrderModal";
import OrderTable from "./components/OrderTable";

export default function OrdersPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: dataOrder } = useQuery(["ordersData"], getAllOrders);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    if (dataOrder && userId) {
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
  }, [dataOrder, session, userId]);

  // Modal Handler
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="min-h-screen">
      <h1 className="text-xl">Hello! {session?.user?.username}</h1>
      <p className="mb-5">
        {session?.user?.email} - {userId}
      </p>
      {session && userId && (
        <OrderModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          userId={+userId}
        />
      )}
      <h1 className="text-center my-5">Order details</h1>
      <OrderTable data={ordersData} />
    </section>
  );
}
