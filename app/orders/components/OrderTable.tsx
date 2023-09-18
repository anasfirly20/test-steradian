"use client";

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
  userId: number;
};

export default function OrderTable({ data, userId }: TProps) {
  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Order No.</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.id}</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
