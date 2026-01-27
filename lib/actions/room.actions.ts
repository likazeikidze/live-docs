"use server";

import { createDocProps, DeleteModalProps } from "@/types";
import { liveblocks } from "../liveblocks";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

// NOTE: removed userId/email parameter so everyone can have access to documents list
export const getDocs = async () => {
  try {
    const { data: rooms } = await liveblocks.getRooms();
    return rooms;
  } catch (error) {
    console.error("Error getting documents:", error);
    return [];
  }
};

export const deleteDoc = async ({ roomId }: DeleteModalProps) => {
  try {
    await liveblocks.deleteRoom(roomId);

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting the document");
  }
};
