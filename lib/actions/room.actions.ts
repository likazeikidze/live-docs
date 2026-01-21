"use server";

import { createDocProps } from "@/types";
import { liveblocks } from "../liveblocks";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

// documents are modeled as Liveblocks rooms, so creating a document means provisioning a collaboration room with metadata and access control.
export const createDoc = async ({ userId, email }: createDocProps) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
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

export const getDoc = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error("Unauthorized");
    // }

    return room;
  } catch (error) {
    console.error("Error getting a document:", error);
  }
};

export const updateDoc = async ({
  roomId,
  title,
}: {
  roomId: string;
  title: string;
}) => {
  try {
    const room = await liveblocks.updateRoom(roomId, {
      metadata: { title },
    });

    revalidatePath(`/documents/${roomId}`);

    return room;
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
