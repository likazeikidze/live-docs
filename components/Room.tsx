"use client";

import Tiptap from "@/components/text-editor/Tiptap";
import Header from "@/components/Header";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import ActiveUsers from "./ui/ActiveUsers";
import Loader from "./ui/Loader";

const Room = ({ roomId, userId }: { roomId: string; userId: string }) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room flex flex-col">
          <Header>
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
