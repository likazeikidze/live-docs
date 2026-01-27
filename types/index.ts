import type { Editor } from "@tiptap/react";

export type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export type MenuBarProps = {
  editor: Editor | null;
};

export type createDocProps = {
  userId: string;
  email: string;
};

export type AddDocButtonProps = {
  userId: string;
  email: string;
};

export type DocumentMetadata = {
  title: string;
  email: string;
  creatorId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
};

export type RoomPermission = "room:read" | "room:write";

export type Room = {
  id: string;
  metadata: DocumentMetadata;
  usersAccesses: Record<string, RoomPermission[]>;
};

export type DeleteModalProps = { roomId: string };
