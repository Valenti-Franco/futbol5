"use client";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { Toaster, toast } from "sonner";
export const UserTwitterCard = ({ user, image }) => {
  const [changeName, setchangeName] = useState(false);
  const [name, setname] = useState(user.name);

  const PostName = async () => {
    // console.log(user._id);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/player/${user._id}`,
        {
          name: name,
        }
      );
      setchangeName(false);
      toast("Nombre cambiado: " + response.data.data.name);
      console.log(response.data.data.name);
      setname(response.data.data.name);
    } catch (error) {
      console.log(error);
      toast.error("Error al Cambiar el Nombre");
    }
  };
  //   console.log(user);
  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={image} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {name}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              {user.email}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0">
        {changeName ? (
          <>
            <Input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              label="Nombre de Usuario"
            />
            <div className="flex">
              {name !== user.name ? (
                <Button
                  onClick={() => PostName()}
                  color="primary"
                  variant="light"
                >
                  Guardar Cambios
                </Button>
              ) : (
                <Button isDisabled color="primary" variant="light">
                  Guardar Cambios
                </Button>
              )}
            </div>
          </>
        ) : (
          <Button
            onClick={() => setchangeName(true)}
            color="primary"
            variant="bordered"
          >
            Cambiar Nombre
          </Button>
        )}
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">
            {user.win}
          </p>
          <p className=" text-default-500 text-small">Partidos Ganados</p>
        </div>
        <Link isBlock onClick={() => signOut()} color="danger">
          Salir
        </Link>
      </CardFooter>
    </Card>
  );
};
