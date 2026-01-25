// types/index.d.ts

// ------------------------
// Clerk User type
// ------------------------
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  imageUrl?: string;
  clerkUserType?: UserType; // editor or viewer
}

// User roles in a room
export type UserType = "editor" | "viewer";

// ------------------------
// Document / Room Metadata
// ------------------------
export interface DocumentMetadata {
  title: string;
  createdAt?: string;
  creatorId?: string;
  email?: string;
  [key: string]: any; // allow extra fields
}

// ------------------------
// Liveblocks types
// ------------------------

// Permissions
export type RoomPermission = "room:read" | "room:write";

// Users accesses mapping
export interface UsersAccesses {
  [email: string]: RoomPermission[];
}

// Room object
export interface Room {
  id: string;
  metadata: DocumentMetadata;
  usersAccesses: UsersAccesses;
}

// Result from resolveUsers function
export interface ResolveUserResult {
  id: string;
  info: User;
}

// Type for resolveUsers function
export type ResolveUsersFn = (params: {
  userIds: string[];
}) => Promise<ResolveUserResult[]>;

// Props for RoomProvider
export interface RoomProviderProps {
  id: string; // roomId
  children: React.ReactNode;
  resolveUsers?: ResolveUsersFn;
}

// Minimal Liveblocks client types (createRoom, identifyUser)
export interface LiveblocksClient {
  createRoom: (
    roomId: string,
    options: {
      metadata: DocumentMetadata;
      usersAccesses: UsersAccesses;
      defaultAccesses?: RoomPermission[];
    },
  ) => Promise<Room>;

  identifyUser: (
    user: { userId: string; groupIds?: string[] },
    info: { [key: string]: any },
  ) => Promise<{ status: number; body: string }>;
}

// Props for Tiptap editor
export type EditorProps = {
  roomId: string;
  currentUserType: UserType;
};
