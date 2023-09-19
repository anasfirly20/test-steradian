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
  const queryClient = useQueryClient();
  // Modal Handler
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const animals = [
    {
      value: 0,
      label: "Dolphin",
    },
    {
      value: 1,
      label: "Chicken",
    },
    {
      value: 2,
      label: "Elephant",
    },
    {
      value: 3,
      label: "Bird",
    },
  ];

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
                <Select
                  name="orderId"
                  variant="underlined"
                  label="Select Order Id"
                  className="max-w-xs"
                  onChange={(e) => {
                    setData({ ...data, orderId: +e.target.value });
                  }}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
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
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
