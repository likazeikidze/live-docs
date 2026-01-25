import Room from "@/components/Room";
import { getDoc } from "@/lib/actions/room.actions";
import { getClerkUsersData } from "@/lib/actions/user.actions";
import { DocumentMetadata, User } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DocumentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const userId = clerkUser.emailAddresses[0].emailAddress;

  const room = await getDoc({
    roomId: id,
    userId,
  });

  if (!room) redirect("/");

  const userEmails = Object.keys(room.usersAccesses);
  const clerkUsers = await getClerkUsersData({ userIds: userEmails });

  const usersWithRoles =
    clerkUsers
      ?.filter((user): user is User => !!user)
      .map((clerkUser) => {
        const access = room.usersAccesses[clerkUser.email];
        return {
          ...clerkUser,
          clerkUserType: access?.includes("room:write") ? "editor" : "viewer",
        };
      }) || [];

  const currentUserType = (room.usersAccesses[userId] || []).includes(
    "room:write",
  )
    ? "editor"
    : "viewer";

  return (
    <main className="h-screen flex flex-col">
      <Room
        roomId={id}
        userId={userId}
        roomMetadata={room.metadata as DocumentMetadata}
        users={usersWithRoles}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default DocumentPage;
