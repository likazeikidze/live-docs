import Header from "@/components/Header";
import AddDocButton from "@/components/ui/AddDocButton";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const documents = [];

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const userId = clerkUser.id;
  const email = clerkUser.emailAddresses[0].emailAddress;

  return (
    <main className="home-container px-4">
      <Header>
        <div className="flex items-center gap-2">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.length > 0 ? (
        <div></div>
      ) : (
        <div className="document-list-empty">
          <Image src="/assets/icons/doc.svg" alt="doc" width={42} height={42} />

          <AddDocButton userId={userId} email={email} />
        </div>
      )}
    </main>
  );
};

export default HomePage;
