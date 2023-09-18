import OrderModal from "@/app/orders/components/OrderModal";
import { formatDate } from "@/helpers/utils/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

type TProps = {
  data: TGETOrders[];
  isLoading: boolean;
  userId: number;
};

export default function OrderTable({ data, isLoading, userId }: TProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                <TableCell>{order?.pickUpTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </article>
  );
}
