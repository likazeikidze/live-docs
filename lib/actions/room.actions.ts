"use server";

import { createDocProps } from "@/types";
import { liveblocks } from "../liveblocks";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export const createDoc = async ({ userId, email }: createDocProps) => {
  const roomId = nanoid();

  const metadata = {
    creatorId: userId,
    email,
    title: "",
  };

  const room = await liveblocks.createRoom(roomId, {
    metadata,
    usersAccesses: {
      [email]: ["room:write"],
    },
    defaultAccesses: [],
  });

  revalidatePath("/");

  return room;
};
