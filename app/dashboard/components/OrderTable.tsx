import { deleteOrder } from "@/api/routes/orders";
import OrderModal from "@/app/orders/components/OrderModal";
import { formatDate } from "@/helpers/utils/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type TProps = {
  data: TGETOrders[];
  isLoading: boolean;
  userId: number;
};

export default function OrderTable({ data, isLoading, userId }: TProps) {
  // Modal handler
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    <article>
      <h1 className="text-center my-5">Order details</h1>
      {userId && (
        <OrderModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          userId={userId}
        />
      )}
      <Table aria-label="Example static collection table" className="mt-3">
        <TableHeader>
          <TableColumn>Order Id</TableColumn>
          <TableColumn>Owner</TableColumn>
          <TableColumn>Owner Id</TableColumn>
          <TableColumn>Owner&apos;s phone No.</TableColumn>
          <TableColumn>Pickup location</TableColumn>
          <TableColumn>Drop Off location</TableColumn>
          <TableColumn>Pickup Date</TableColumn>
          <TableColumn>Drop Off Date</TableColumn>
          <TableColumn>Pickup Time</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody emptyContent={"Loading..."}>{[]}</TableBody>
        ) : (
          <TableBody>
            {data?.map((order) => (
              <TableRow key={order?.id}>
                <TableCell>{order?.id}</TableCell>
                <TableCell>{order?.user?.email}</TableCell>
                <TableCell>{order?.user?.id}</TableCell>
                <TableCell>{order?.user?.phoneNumber}</TableCell>
                <TableCell>{order?.pickUpLoc}</TableCell>
                <TableCell>{order?.dropOffLoc}</TableCell>
                <TableCell>{formatDate(order?.pickUpDate)}</TableCell>
                <TableCell>{formatDate(order?.dropOffDate)}</TableCell>
                <TableCell className="flex justify-between items-center">
                  {order?.pickUpTime}{" "}
                  <section className="relative flex items-center gap-2">
                    <Tooltip content="Edit order">
                      <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <Icon icon="bx:edit" fontSize={25} />
                      </button>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete order">
                      <button
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => {
                          deleteOrderMutation.mutate(order?.id);
                        }}
                      >
                        <Icon
                          icon="material-symbols:delete-outline"
                          fontSize={25}
                        />
                      </button>
                    </Tooltip>
                  </section>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </article>
  );
}
