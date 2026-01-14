import { liveblocks } from "@/lib/liveblocks";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("sign-in");

  const { id, emailAddresses, firstName, lastName, imageUrl } = clerkUser;

  try {
    // Get the current user from your database
    const user = {
      id,
      info: {
        id,
        email: emailAddresses[0].emailAddress,
        name: `${firstName} ${lastName}`,
        avatar: imageUrl,
        color: "FF0000",
      },
    };

    // Identify the user and return the result
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: user.info.email,
        groupIds: [], // Optional
      },
      { userInfo: user.info }
    );

    return new Response(body, { status });
  } catch (error) {
    console.error("Error identifying user with Liveblocks:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
