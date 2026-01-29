"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./button";
import { deleteDoc } from "@/lib/actions/room.actions";
import { DeleteModalProps } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDeleteDoc = async () => {
    try {
      setLoading(true);
      await deleteDoc({ roomId });

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting the document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center p-2 hover:bg-gray-700 rounded-md">
        <Image
          src="/assets/icons/delete.svg"
          alt="delete"
          width={20}
          height={20}
        />
      </DialogTrigger>

      <DialogContent className="bg-gray-300 rounded-xl border-none shadow-gray-900">
        <DialogHeader>
          <DialogTitle className="text-black">
            Are you sure you want to delete the document?
          </DialogTitle>
          <DialogDescription className="text-black mt-2 wrap-break-word">
            This action cannot be undone. This will permanently delete your
            document.
          </DialogDescription>
          <Button
            disabled={loading}
            className="bg-red-700 hover:bg-red-600 mt-3 max-w-2xs mx-auto disabled:opacity-50"
            onClick={handleDeleteDoc}
          >
            {loading ? (
              <span className="text-white">Deleting...</span>
            ) : (
              <span className="text-white">Yes, delete it</span>
            )}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
