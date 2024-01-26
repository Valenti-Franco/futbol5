"use client";
import { headers } from "@/next.config";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const CreateGameComponent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();

  const [selectedDate, setselectedDate] = useState("");
  const [selectedTime, setselectedTime] = useState("");
  const [selectedSite, setselectedSite] = useState("");
  const [selectedLink, setselectedLink] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      getUser();
    }
  }, [session]);
  const [user, setuser] = useState(false);
  const getUser = async () => {
    // console.log(session.user.email);
    try {
      const dataUser = await axios.post(
        "https://futbol5-one.vercel.app//api/player/getByEmail",
        {
          email: session.user.email,
        }
      );

      setuser(dataUser.data);
    } catch (error) {
      console.log("no se pudo");
    }
  };

  const handlerPostGame = async () => {
    try {
      const data = await axios.post(
        "https://futbol5-one.vercel.app//api/game",
        {
          site: selectedSite,
          urlMap: selectedLink,
          time: selectedTime,
          day: selectedDate,
        },
        {
          headers: {
            id: `${user.data._id}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // console.log(data.data);
  };
  // console.log(user);
  return (
    <div
      style={user?.data?.role !== "admin" ? { display: "none" } : {}}
      className=" w-full flex items-center p-5 justify-center"
    >
      <Button
        onPress={onOpen}
        isIconOnly
        color="primary"
        variant="ghost"
        // aria-label="Take a photo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-plus"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Partido
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  //   endContent={
                  //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  //   }
                  label="Lugar"
                  placeholder="Agrega un Lugar"
                  variant="bordered"
                  value={selectedSite}
                  onChange={(e) => setselectedSite(e.target.value)}
                />
                <Input
                  //   endContent={
                  //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  //   }
                  label="Dia "
                  placeholder="Agrega día"
                  type="date"
                  variant="bordered"
                  value={selectedDate}
                  onChange={(e) => setselectedDate(e.target.value)}
                />
                <Input
                  //   endContent={
                  //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  //   }
                  label="Hora"
                  placeholder="Agrega Hora"
                  type="time"
                  variant="bordered"
                  value={selectedTime}
                  onChange={(e) => setselectedTime(e.target.value)}
                />
                <Input
                  autoFocus
                  //   endContent={
                  //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  //   }
                  label="Link GoogleMaps"
                  placeholder="Agrega un Link de Google Maps"
                  variant="bordered"
                  value={selectedLink}
                  onChange={(e) => setselectedLink(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  onClick={() => handlerPostGame()}
                  color="primary"
                  onPress={onClose}
                >
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateGameComponent;
