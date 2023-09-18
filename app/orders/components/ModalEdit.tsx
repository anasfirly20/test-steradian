import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import InputLabel from "@/app/components/InputLabel";

type TProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  order: TGETOrderById;
};

export default function ModalEdit({ isOpen, onOpenChange, order }: TProps) {
  const queryClient = useQueryClient();
  const initialValues = {
    pickUpLoc: "",
    dropOffLoc: "",
    pickUpTime: "",
    pickUpDate: "",
    dropOffDate: "",
  };
  const [data, setData] = useState(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (order) {
      setData(order);
    }
  }, [order]);

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
                Modal Title
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
                />
                <InputLabel
                  label="Drop off date"
                  type="date"
                  name="dropOffDate"
                  value={data?.dropOffDate ?? ""}
                  onChange={handleChange}
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
                <Button color="primary" onPress={onClose}>
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
