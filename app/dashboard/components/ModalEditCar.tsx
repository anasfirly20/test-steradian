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
import CustomSelect from "@/app/components/CustomSelect";

// Api
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putCar } from "@/api/routes/cars";

// Miscellaneous
import React, { ChangeEvent, useEffect, useState } from "react";
import { car_ratings } from "@/helpers/constants/constants";
import toast from "react-hot-toast";

type TProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  car: TGETCarById;
};

const initialValues = {
  id: 0,
  name: "",
  carType: "",
  rating: 0,
  fuel: "",
  image: "",
  hourRate: "",
  dayRate: "",
  monthRate: "",
  orderId: 0,
};

export default function ModalEditCar({ isOpen, onOpenChange, car }: TProps) {
  const [data, setData] = useState(initialValues);

  const queryClient = useQueryClient();
  const cachedOrders = queryClient.getQueryData<TGETOrders[]>(["ordersData"]);

  useEffect(() => {
    if (car) {
      setData(car);
    }
  }, [car]);

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

  const editCarMutation = useMutation(
    (body: TPUTCar) => {
      const id = data?.id;
      return putCar(id, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carsData"]);
        toast.success("Car has been updated");
      },
      onError: (err) => {
        toast.error("An error occurred");
        console.log(err);
      },
    }
  );

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit car
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
                <CustomSelect
                  label="Rating"
                  dataToMap={car_ratings}
                  onChange={(e) => {
                    setData({ ...data, rating: +e.target.value });
                  }}
                />
                <CustomSelect
                  label="Order Id"
                  dataToMap={cachedOrders}
                  onChange={(e) => {
                    setData({ ...data, orderId: +e.target.value });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    editCarMutation.mutate(data);
                    onClose();
                  }}
                >
                  Edit Car
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
