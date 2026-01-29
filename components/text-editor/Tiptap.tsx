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
import ThreadOverlay from "./ThreadOverlay";

const Tiptap = ({ roomId }: { roomId: string }) => {
  const liveblocks = useLiveblocksExtension({
    initialContent: "<p></p>",
  });

  const editor = useEditor({
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
        undoRedo: false,
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
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      // attributes: {
      //   class:
      // },
    },
  });

  if (!editor) return null;

  return (
    <div className="flex-1 h-full max-w-full overflow-hidden">
      <Toolbar editor={editor} className="rounded-2xl mb-1 w-full" />

      <EditorContent
        editor={editor}
        className="border border-gray-700 rounded-lg min-h-120 max-w-110 w-full p-4 focus:outline-none mx-auto overflow-y-auto wrap-break-word"
      />

      <FloatingComposer editor={editor} style={{ width: "350px" }} />

      <ThreadOverlay editor={editor} />
    </div>
  );
};

export default Tiptap;
