"use server";

import { createDocProps } from "@/types";
import { liveblocks } from "../liveblocks";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export const createDoc = async ({ userId, email }: createDocProps) => {
  const roomId = nanoid();

  try {
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
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    return room;
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error("Failed to create room");
  }
};
