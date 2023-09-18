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
              <TableCell className="flex justify-between group">
                {e.pickUpTime}
                <section className="flex gap-1 group-hover:opacity-100 opacity-0 transition-opacity ease-out">
                  <button>
                    <Icon icon="bx:edit" fontSize={25} />
                  </button>
                  <button>
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
