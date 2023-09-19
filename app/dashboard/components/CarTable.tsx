import { formatDate } from "@/helpers/utils/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import ModalAddCar from "./ModalAddCar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar } from "@/api/routes/cars";
import toast from "react-hot-toast";

type TProps = {
  data: TGETCars[];
  isLoading: boolean;
};

export default function CarTable({ data, isLoading }: TProps) {
  const queryClient = useQueryClient();

  // Delete car by id
  const deleteCarMutation = useMutation(deleteCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["carsData"]);
      toast.success("Car deleted");
    },
    onError: (err) => {
      toast.error("An error occurred");
      console.log(err);
    },
  });

  return (
    <article>
      <h1 className="text-center my-5">Car details</h1>
      <ModalAddCar />
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Car Id</TableColumn>
          <TableColumn>Order Id</TableColumn>
          <TableColumn>Owner Id</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Fuel</TableColumn>
          <TableColumn>Hour Rate</TableColumn>
          <TableColumn>Day Rate</TableColumn>
          <TableColumn>Month Rate</TableColumn>
          <TableColumn>Pickup Location</TableColumn>
          <TableColumn>Pickup Date</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody emptyContent={"Loading..."}>{[]}</TableBody>
        ) : (
          <TableBody>
            {data?.map((car) => (
              <TableRow key={car?.id}>
                <TableCell>{car?.id}</TableCell>
                <TableCell>{car?.orderId}</TableCell>
                <TableCell>{car?.order?.userId}</TableCell>
                <TableCell>{car?.name}</TableCell>
                <TableCell>{car?.carType}</TableCell>
                <TableCell>{car?.fuel}</TableCell>
                <TableCell>{car?.hourRate}</TableCell>
                <TableCell>{car?.dayRate}</TableCell>
                <TableCell>{car?.monthRate}</TableCell>
                <TableCell>{car?.order?.pickUpLoc}</TableCell>
                <TableCell className="flex justify-between items-center">
                  {formatDate(car?.order?.pickUpDate)}
                  <section className="relative flex items-center gap-2">
                    <Tooltip content="Edit car">
                      <button
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        // onClick={() => {
                        //   getSingleOrder(order?.id);
                        //   onOpenEdit();
                        // }}
                      >
                        <Icon icon="bx:edit" fontSize={25} />
                      </button>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete car">
                      <button
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => {
                          deleteCarMutation.mutate(car?.id);
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
