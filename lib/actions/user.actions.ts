"use server";

import { clerkClient } from "@clerk/nextjs/server";

// app-specific user data
export const getClerkUsersData = async ({ userIds }: { userIds: string[] }) => {
  // This function receives a list of user IDs and you should return a list of user objects of the same size, in the same order.
  try {
    const client = await clerkClient();
    const { data } = await client.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user: any) => {
      return {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.imageUrl,
        color: "#6c47ff",
      };
    });

    const orderedUsers = userIds.map((email) =>
      users.find((user: any) => user.email === email),
    );

    return orderedUsers;
  } catch (error) {
    console.error("Error fetching user data from Clerk:", error);
  }
};
