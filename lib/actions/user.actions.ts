// "use server";

// import { clerkClient } from "@clerk/nextjs/server";

// export const getClerkUsersInfo = async ({ ids }: { ids: string[] }) => {
//   const response = (await clerkClient()).users.getUserList({
//     emailAddress: ids,
//   });

//   try {
//   } catch (error) {
//     console.error("Error fetching user info from Clerk:", error);
//   }
// };
