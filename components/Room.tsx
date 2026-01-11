"use client";

import Tiptap from "@/components/text-editor/Tiptap";
import Header from "@/components/Header";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";

const Room = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="flex-1 flex flex-col collaborative-room">
          <Header>
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
          </Header>
          <Tiptap />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
