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

type TProps = {
  data: TGETOrders[];
};

export default function OrderTable({ data }: TProps) {
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
          {data?.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.id}</TableCell>
              <TableCell>{e.pickUpLoc}</TableCell>
              <TableCell>{e.dropOffLoc}</TableCell>
              <TableCell>{formatDate(e.pickUpDate)}</TableCell>
              <TableCell>{formatDate(e.dropOffDate)}</TableCell>
              <TableCell>{e.pickUpTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
