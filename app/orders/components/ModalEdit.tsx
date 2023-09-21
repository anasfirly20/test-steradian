import { ChangeEvent, useEffect, useState } from "react";

// Next ui
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Components
import InputLabel from "@/app/components/InputLabel";
import toast from "react-hot-toast";

// Api
import { putOrderById } from "@/api/routes/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formValidator, stringToNumeric } from "@/helpers/utils/utils";

type TProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  order: TGETOrderById;
};

const initialValues = {
  id: 0,
  pickUpLoc: "",
  dropOffLoc: "",
  pickUpDate: "",
  dropOffDate: "",
  pickUpTime: "",
};

export default function ModalEdit({ isOpen, onOpenChange, order }: TProps) {
  const queryClient = useQueryClient();
  const [data, setData] = useState(initialValues);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (order) {
      setData(order);
    }
  }, [order]);

  const editOrderMutation = useMutation(
    (body: TPUTOrder) => {
      const id = data?.id;
      return putOrderById(id, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["ordersData"]);
        toast.success("Order has been updated");
      },
      onError: (err) => {
        toast.error("An error occurred");
        console.log(err);
      },
    }
  );

  // pickup/dropoff date checker
  useEffect(() => {
    const modPickUpDate = stringToNumeric(data?.pickUpDate);
    const modDropOffDate = stringToNumeric(data?.dropOffDate);
    if (modPickUpDate > modDropOffDate) {
      setIsInvalid(true);
      toast.error("Pick up date must not be LATER than drop off Date");
    } else {
      setIsInvalid(false);
    }
  }, [data?.dropOffDate, data?.pickUpDate]);

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Order
              </ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-y-8">
                <Input
                  variant="underlined"
                  label="Pick up location"
                  name="pickUpLoc"
                  value={data?.pickUpLoc ?? ""}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Drop off location"
                  name="dropOffLoc"
                  value={data?.dropOffLoc ?? ""}
                  onChange={handleChange}
                />
                <InputLabel
                  label="Pick up date"
                  type="date"
                  name="pickUpDate"
                  value={data?.pickUpDate ?? ""}
                  onChange={handleChange}
                  isInvalid={isInvalid}
                />
                <InputLabel
                  label="Drop off date"
                  type="date"
                  name="dropOffDate"
                  value={data?.dropOffDate ?? ""}
                  onChange={handleChange}
                  isInvalid={isInvalid}
                />
                <InputLabel
                  label="Pick up time"
                  type="time"
                  name="pickUpTime"
                  value={data?.pickUpTime ?? ""}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={!isInvalid ? false : true}
                  color="primary"
                  variant="solid"
                  onPress={() => {
                    editOrderMutation.mutate(data);
                    onClose();
                  }}
                >
                  Edit order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
