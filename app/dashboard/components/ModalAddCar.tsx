import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCar } from "@/api/routes/cars";
import toast from "react-hot-toast";
import { formValidator } from "@/helpers/utils/utils";

const initialValues = {
  name: "",
  carType: "",
  rating: 0,
  fuel: "",
  image: "null",
  hourRate: "",
  dayRate: "",
  monthRate: "",
  orderId: 0,
};

export default function ModalAddCar() {
  // Modal Handler
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();
  const cachedOrders = queryClient.getQueryData<TGETOrders[]>(["ordersData"]);

  const [data, setData] = useState(initialValues);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "rating") {
      setData({ ...data, [name]: +value });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const newCarMutation = useMutation(postCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["carsData"]);
      toast.success("New car has been added");
      setData(initialValues);
    },
    onError: (err) => {
      toast.error("An error occurred");
      console.log(err);
    },
  });

  useEffect(() => {
    console.log("CHECK >>", data);
  }, [data]);

  return (
    <>
      <Button variant="ghost" onPress={onOpen} className="mb-3">
        Add a new car
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new car
              </ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-y-8">
                <Input
                  variant="underlined"
                  label="Name"
                  name="name"
                  value={data?.name}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Type"
                  name="carType"
                  value={data?.carType}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Rating"
                  name="rating"
                  value={data?.rating.toString()}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Fuel"
                  name="fuel"
                  value={data?.fuel}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Hour Rate"
                  name="hourRate"
                  value={data?.hourRate}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Day Rate"
                  name="dayRate"
                  value={data?.dayRate}
                  onChange={handleChange}
                />
                <Input
                  variant="underlined"
                  label="Month Rate"
                  name="monthRate"
                  value={data?.monthRate}
                  onChange={handleChange}
                />
                <select
                  name="orderId"
                  className="bg-transparent outline-none border-b-2 border-[#3f3f45] cursor-pointer"
                  onChange={(e) => {
                    setData({ ...data, orderId: +e.target.value });
                  }}
                >
                  {cachedOrders?.map((order) => (
                    <option key={order?.id} value={order?.id}>
                      {order?.id}
                    </option>
                  ))}
                </select>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    if (!formValidator(data)) {
                      toast.error("All fields are mandatory");
                      return;
                    }
                    newCarMutation.mutate(data);
                    onClose();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
