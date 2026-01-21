import Room from "@/components/Room";
import { getDoc } from "@/lib/actions/room.actions";
import { DocumentMetadata } from "@/types";
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

  return (
    <main className="h-screen flex flex-col">
      <Room
        roomId={id}
        userId={userId}
        roomMetadata={room.metadata as DocumentMetadata}
      />
    </main>
  );
};

export default DocumentPage;
