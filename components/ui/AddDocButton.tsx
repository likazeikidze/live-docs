"use client";

import { AddDocButtonProps } from "@/types";
import { Button } from "./button";
import Image from "next/image";
import { createDoc } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

const AddDocButton = ({ userId, email }: AddDocButtonProps) => {
  const router = useRouter();

  const handleAddDoc = async () => {
    try {
      const room = await createDoc({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <Button
      className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 cursor-pointer"
      type="submit"
      onClick={handleAddDoc}
    >
      <Image src="/assets/icons/add.svg" alt="add" width={18} height={18} />
      <p className="hidden sm:block">Create a new document</p>
    </Button>
  );
};

export default AddDocButton;
