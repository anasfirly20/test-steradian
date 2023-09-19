import React, { ChangeEvent, useState } from "react";

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

const initialValues = {
  name: "",
  carType: "",
  rating: "",
  fuel: "",
  image: null,
  hourRate: "",
  dayRate: "",
  monthRate: "",
  orderId: null,
};

export default function ModalAddCar() {
  // Modal Handler
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState(initialValues);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [value, setValue] = React.useState(new Set<string>([]));

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(new Set([e.target.value]));
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
                  value={data?.rating}
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
                  variant="underlined"
                  label="Select Order Id"
                  selectedKeys={value}
                  className="max-w-xs"
                  onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.label}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <p className="text-small text-default-500">Selected: {value}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    console.log("data>>", data);
                    // onClose()
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
