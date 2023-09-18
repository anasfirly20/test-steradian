"use client";

// Utils
import { formatDate } from "@/helpers/utils/utils";

// Next ui
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

// Miscellaneous
import { Icon } from "@iconify/react";

// Api
import { deleteOrder } from "@/api/routes/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TProps = {
  data: TGETOrders[];
};

export default function OrderTable({ data }: TProps) {
  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["ordersData"]);
      toast.success("Order deleted");
    },
    onError: (err) => {
      toast.error("An error occurred");
      console.log(err);
    },
  });

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Order No.</TableColumn>
          <TableColumn>Pickup Location</TableColumn>
          <TableColumn>Drop Off Location</TableColumn>
          <TableColumn>Pickup Date</TableColumn>
          <TableColumn>Drop Off Date</TableColumn>
          <TableColumn>Pickup Time</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((order) => (
            <TableRow key={order?.id}>
              <TableCell>{order?.id}</TableCell>
              <TableCell>{order?.pickUpLoc}</TableCell>
              <TableCell>{order?.dropOffLoc}</TableCell>
              <TableCell>{formatDate(order?.pickUpDate)}</TableCell>
              <TableCell>{formatDate(order?.dropOffDate)}</TableCell>
              <TableCell className="flex justify-between group">
                {order?.pickUpTime}
                <section className="flex gap-1 group-hover:opacity-100 opacity-0 transition-opacity ease-out">
                  <button>
                    <Icon icon="bx:edit" fontSize={25} />
                  </button>
                  <button
                    onClick={() => {
                      deleteOrderMutation.mutate(order?.id);
                      console.log("order id>>", order?.id);
                    }}
                  >
                    <Icon
                      icon="material-symbols:delete-outline"
                      fontSize={25}
                    />
                  </button>
                </section>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
