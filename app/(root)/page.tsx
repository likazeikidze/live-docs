import Header from "@/components/Header";
import AddDocButton from "@/components/ui/AddDocButton";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getDocs } from "@/lib/actions/room.actions";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import DeleteModal from "@/components/ui/DeleteModal";
import { ModeToggle } from "@/components/ui/ModeToggle";

const HomePage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const userId = clerkUser.id;
  const email = clerkUser.emailAddresses[0].emailAddress;

  const docs = await getDocs();

  // TODO: Notifications alert

  return (
    <main className="home-container px-4">
      <Header>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {docs.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-xl md:text-2xl">All Documents</h3>
            <AddDocButton userId={userId} email={email} />
          </div>

          <ul className="document-list">
            {docs?.map(({ id, metadata, createdAt }) => (
              <li key={id} className="document-list-item">
                <Link
                  href={`/documents/${id}`}
                  className="flex items-center gap-5"
                >
                  <div>
                    <Image
                      src="/assets/icons/doc.svg"
                      alt="document"
                      width={42}
                      height={42}
                      className="hidden sm:block"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-xl">{metadata.title}</p>

                    <p className="text-sm">{timeAgo(createdAt)}</p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
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
