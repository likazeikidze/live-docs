"use client";

import Tiptap from "@/components/text-editor/Tiptap";
import Header from "@/components/Header";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import ActiveUsers from "./ui/ActiveUsers";
import Loader from "./ui/Loader";
import { DocumentMetadata } from "@/types";
import { EditIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { updateDoc } from "@/lib/actions/room.actions";

const Room = ({
  roomId,
  userId,
  roomMetadata,
}: {
  roomId: string;
  userId: string;
  roomMetadata: DocumentMetadata;
}) => {
  const [editing, setEditing] = useState(false);
  // TODO: Fix loading state when clicking on homepage
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentUserType = "editor";

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (title !== roomMetadata.title) {
          await updateDoc({ roomId, title });

          setEditing(false);
        }
      } catch (error) {
        console.error("Error updating document:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = async (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        setLoading(true);

        try {
          await updateDoc({ roomId, title });
        } catch (error) {
          console.error("Error updating document:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [roomId, title]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room flex flex-col">
          <Header>
            <div
              ref={containerRef}
              className="flex items-center justify-center"
            >
              {editing && !loading ? (
                <Input
                  ref={inputRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm md:text-lg text-white text-center border-none p-0 mx-1 min-w-[50%]"
                  placeholder="Change title"
                  onKeyDown={updateTitleHandler}
                />
              ) : (
                <p className="text-sm md:text-lg text-white text-center">
                  {title}
                </p>
              )}

              {currentUserType === "editor" && !editing && (
                <EditIcon
                  className="mx-3 cursor-pointer"
                  onClick={() => setEditing(true)}
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="text-sm">
                  You are not allowed to edit this title.
                </p>
              )}

              {loading && <p className="text-sm mx-2">Saving a new title...</p>}
            </div>
            <div className="flex items-center gap-4">
              <ActiveUsers />
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-[#6c47ff] text-white rounded px-4 py-2">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Tiptap />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
