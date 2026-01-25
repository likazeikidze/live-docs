import { MenuBarProps } from "@/types";

import { Toggle } from "@radix-ui/react-toggle";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  List,
  HighlighterIcon,
  PlusIcon,
} from "lucide-react";

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
      disabled: editor.state.selection.empty,
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },

    {
      icon: <HighlighterIcon className="size-4" />,
      onClick: () =>
        editor.chain().focus().toggleHighlight({ color: "#c90414" }).run(),
      pressed: editor.isActive("highlight", { color: "#c90414" }),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 mb-1 rounded-lg border bg-white p-1 shadow-sm">
      {options.map((option, index) => {
        return (
          <Toggle
            key={index}
            pressed={option.pressed}
            onClick={option.onClick}
            className=" inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 data-[state=on]:bg-slate-200 data-[state=on]:text-slate-900 transition"
          >
            {option.icon}
          </Toggle>
        );
      })}
    </div>
  );
};

export default MenuBar;
