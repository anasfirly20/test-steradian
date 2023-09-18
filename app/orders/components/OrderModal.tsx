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

// Components
import DatePicker from "@/app/components/DatePicker";

type TProps = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

export default function OrderModal({ isOpen, onOpen, onOpenChange }: TProps) {
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
              <ModalBody className="grid grid-cols-2">
                <Input variant="underlined" label="Pick up location" />
                <Input variant="underlined" label="Drop off location" />
                <Input variant="underlined" label="Pick up time" />
                <Input variant="underlined" label="Pick up date" />
                <DatePicker />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
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
