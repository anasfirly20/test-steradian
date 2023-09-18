import { formatDate } from "@/helpers/utils/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type TProps = {
  data: TGETCars[];
  isLoading: boolean;
};

export default function CarTable({ data, isLoading }: TProps) {
  return (
    <article>
      <h1 className="text-center my-5">Car details</h1>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Car No.</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Fuel</TableColumn>
          <TableColumn>Hour Rate</TableColumn>
          <TableColumn>Day Rate</TableColumn>
          <TableColumn>Month Rate</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody emptyContent={"Loading..."}>{[]}</TableBody>
        ) : (
          <TableBody>
            {data?.map((car) => (
              <TableRow key={car?.id}>
                <TableCell>{car?.id}</TableCell>
                <TableCell>{car?.name}</TableCell>
                <TableCell>{car?.carType}</TableCell>
                <TableCell>{car?.fuel}</TableCell>
                <TableCell>{car?.hourRate}</TableCell>
                <TableCell>{car?.dayRate}</TableCell>
                <TableCell>{car?.monthRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </article>
  );
}
