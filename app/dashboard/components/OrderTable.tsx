// Api
import { deleteOrder, getOrderById } from "@/api/routes/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Components
import ModalEdit from "@/app/orders/components/ModalEdit";
import OrderModal from "@/app/orders/components/OrderModal";

// Next ui
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Tooltip } from "@nextui-org/tooltip";

// Miscellaneous
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/helpers/utils/utils";

// Miscellaneous

type TProps = {
  data: TGETOrders[];
  isLoading: boolean;
  userId: number;
};

export default function OrderTable({ data, isLoading, userId }: TProps) {
  // Modal handler add new order
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

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

  // Modal handler "edit" order
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  // Get single order
  const [order, setOrder] = useState({});

  const getSingleOrder = async (userId: number) => {
    try {
      const res = await getOrderById(userId);
      setOrder(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <article>
      <h1 className="text-center my-5">Order details</h1>
      {userId && (
        <OrderModal
          isOpen={isOpenAdd}
          onOpen={onOpenAdd}
          onOpenChange={onOpenChangeAdd}
          userId={userId}
        />
      )}
      <ModalEdit
        isOpen={isOpenEdit}
        onOpenChange={onOpenChangeEdit}
        order={order as TGETOrderById}
      />
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
          <TableColumn> </TableColumn>
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
                </TableCell>
                <TableCell>
                  <section className="relative flex items-center gap-2">
                    <Tooltip content="Edit order">
                      <button
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => {
                          getSingleOrder(order?.id);
                          onOpenEdit();
                        }}
                      >
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
