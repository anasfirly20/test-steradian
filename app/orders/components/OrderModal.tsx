"use client";

// Next UI
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Miscellanepis
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formValidator, stringToNumeric } from "@/helpers/utils/utils";

// Components
import InputLabel from "@/app/components/InputLabel";

// Api
import { postOrder } from "@/api/routes/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TProps = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  userId: number;
};

export default function OrderModal({
  isOpen,
  onOpen,
  onOpenChange,
  userId,
}: TProps) {
  const queryClient = useQueryClient();
  const initialValues = {
    pickUpLoc: "",
    dropOffLoc: "",
    pickUpTime: "",
    pickUpDate: "",
    dropOffDate: "",
    userId: userId,
  };
  const [data, setData] = useState(initialValues);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

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

  const newOrderMutation = useMutation(postOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["ordersData"]);
      toast.success("New order has been added");
      setData(initialValues);
    },
    onError: (err) => {
      toast.error("An error occurred");
      console.log(err);
    },
  });

  const handleAdd = () => {
    if (!userId) {
      toast.error("You are not authenticated to do this operation");
    }
    newOrderMutation.mutate(data);
  };

  return (
    <>
      <Button variant="ghost" color="default" onPress={onOpen}>
        Add a new order
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order details
              </ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-y-8">
                <Input
                  variant="underlined"
                  label="Pick up location"
                  name="pickUpLoc"
                  value={data?.pickUpLoc}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Drop off location"
                  name="dropOffLoc"
                  value={data?.dropOffLoc}
                  onChange={handleChange}
                />
                <InputLabel
                  label="Pick up date"
                  type="date"
                  name="pickUpDate"
                  value={data?.pickUpDate}
                  onChange={handleChange}
                  isInvalid={isInvalid}
                />
                <InputLabel
                  label="Drop off date"
                  type="date"
                  name="dropOffDate"
                  value={data?.dropOffDate}
                  onChange={handleChange}
                  isInvalid={isInvalid}
                />
                <InputLabel
                  label="Pick up time"
                  type="time"
                  name="pickUpTime"
                  value={data?.pickUpTime}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={formValidator(data) && !isInvalid ? false : true}
                  color="primary"
                  variant="solid"
                  onPress={() => {
                    if (!formValidator(data)) {
                      toast.error("All fields are mandatory");
                      return;
                    }
                    handleAdd();
                    onClose();
                  }}
                >
                  Add order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
