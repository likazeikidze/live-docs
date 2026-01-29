"use client";
import { getClerkUsersData } from "@/lib/actions/user.actions";

import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import Loader from "@/components/ui/Loader";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        return await getClerkUsersData({ userIds });
      }}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default Provider;
