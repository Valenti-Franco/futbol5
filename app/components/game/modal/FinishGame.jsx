"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";

const FinishGame = ({ finishGame }) => {
  const [teamA, setteamA] = useState("");
  const [teamB, setteamB] = useState("");

  const [backdrop, setBackdrop] = React.useState("blur");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <Button
        // onClick={() => randomTeam()}
        onPress={() => handleOpen()}
        isIconOnly
        color="danger"
        variant="faded"
        aria-label="Take a photo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-flag-off"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 5v16" />
          <path d="M19 5v9" />
          <path d="M7.641 3.645a5 5 0 0 1 4.359 1.355a5 5 0 0 0 7 0" />
          <path d="M5 14a5 5 0 0 1 7 0a4.984 4.984 0 0 0 3.437 1.429m3.019 -.966c.19 -.14 .371 -.294 .544 -.463" />
          <path d="M3 3l18 18" />
        </svg>
      </Button>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Terminar Partido
              </ModalHeader>
              <ModalBody>
                <label>
                  <h2>LOCAL</h2>
                  <Input
                    type="number"
                    value={teamA}
                    onChange={(e) => setteamA(e.target.value)}
                    label="GOLES LOCAL"
                  />
                </label>
                <label>
                  <h2>VISIANTE</h2>
                  <Input
                    type="number"
                    value={teamB}
                    onChange={(e) => setteamB(e.target.value)}
                    label="GOLES VISITANTES"
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  onClick={() => finishGame(teamA, teamB)}
                  color="primary"
                  onPress={onClose}
                >
                  TERMINAR PARTIDO
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FinishGame;
