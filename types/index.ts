import type { Editor } from "@tiptap/react";

export type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export type MenuBarProps = {
  editor: Editor | null;
};
