import { useThreads } from "@liveblocks/react/suspense";
import { AnchoredThreads, FloatingThreads } from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

function ThreadOverlay({ editor }: { editor: Editor | null }) {
  const { threads } = useThreads({ query: { resolved: false } });

  return (
    <>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="w-87.5 block md:hidden"
      />
      <AnchoredThreads
        editor={editor}
        threads={threads}
        className="w-87.5 hidden sm:block"
      />
    </>
  );
}

export default ThreadOverlay;
