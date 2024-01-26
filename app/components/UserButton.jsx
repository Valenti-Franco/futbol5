"use client";
import React, { useEffect, useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

import {
  Avatar,
  Badge,
  DropdownItem,
  DropdownMenu,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import { UserTwitterCard } from "./game/UserTwitterCard";

const UserButton = () => {
  const { data: session, status } = useSession();
  // console.log(session);
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
        "https://futbol5-one.vercel.app/api/player/getByEmail",
        {
          email: session.user.email,
        }
      );

      setuser(dataUser.data);
      // console.log(dataUser.data);
    } catch (error) {
      console.log("no se pudo");
    }
  };
  const NotificationIcon = ({ size, height, width, ...props }) => {
    return (
      <svg
        fill="none"
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          clipRule="evenodd"
          d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <>
      {!user ? (
        <div class="px-6 sm:px-0 max-w-sm">
          <button
            onClick={() => signIn()}
            type="button"
            class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              class="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google<div></div>
          </button>
        </div>
      ) : (
        <>
          <Popover showArrow placement="bottom">
            <PopoverTrigger>
              <div className="flex gap-2">
                <div class="flex flex-col items-end ">
                  <div class="text-md font-medium ">{user.data.name}</div>

                  <div class="text-sm font-regular">
                    {" "}
                    {user.data.win} Partidos Ganados
                    {/* <button onClick={() => signOut()}>Salir</button>{" "} */}
                  </div>
                </div>
                <Badge
                  content=""
                  color="success"
                  shape="circle"
                  placement="bottom-right"
                >
                  <Avatar
                    isBordered
                    className=" bg-white"
                    color="success"
                    src={session.user.image}
                  />
                </Badge>
                {/* <User
                as="button"
                name="Zoe Lang"
                description="Product Designer"
                className="transition-transform"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              /> */}
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <UserTwitterCard user={user.data} image={session.user.image} />
            </PopoverContent>
          </Popover>
          {/* <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Badge
                content=""
                color="success"
                shape="circle"
                placement="bottom-right"
              >
                <User
                  name="Jane Doe"
                  description="Product Designer"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
                <Avatar isBordered color="success" src={session.user.image} />
              </Badge>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">Popover Content</div>
                <div className="text-tiny">This is the popover content</div>
              </div>
            </PopoverContent>
          </Popover> */}

          {/* <Image
            class="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"
            width={100}
            height={100}
            src={session.user.image}
            alt=""
          /> */}

          {/* <div>
              Hola, {user.data.name}{" "}
              <Image width={100} height={100} src={session.user.image} alt="" />
            </div>
            <button onClick={() => signOut()}>Salir</button> */}
        </>
      )}
    </>
  );
};

export default UserButton;
