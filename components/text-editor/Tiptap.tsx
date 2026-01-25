"use client";

import {
  useLiveblocksExtension,
  FloatingComposer,
  Toolbar,
} from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";
import { UserType } from "@/types";
import ThreadOverlay from "./ThreadOverlay";
import Loader from "../ui/Loader";

const Tiptap = ({
  roomId,
  currentUserType,
}: {
  roomId: string;
  currentUserType: UserType;
}) => {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editable: currentUserType === "editor",
    content: "<p></p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "border border-gray-300 rounded-lg p-4 mx-w-full h-full min-h-[400px] focus:outline-none",
      },
    },
  });

  if (!editor) {
    return <Loader />;
  }

  return (
    <div className="flex-1 h-full">
      {/* <MenuBar editor={editor} /> */}
      <Toolbar editor={editor} className="rounded-2xl mb-1 w-full" />
      <EditorContent editor={editor} />
      <FloatingComposer editor={editor} style={{ width: "350px" }} />

      <ThreadOverlay editor={editor} />
    </div>
  );
};

export default Tiptap;
