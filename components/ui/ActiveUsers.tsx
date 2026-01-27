"use client";

import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";

const ActiveUsers = () => {
  const others = useOthers();
  const users = others.map((other) => other.info);

  return (
    <ul className="users-list">
      {users.map((user) => (
        <li key={user.id}>
          <Image
            src={user.avatar}
            alt="avatar"
            width={32}
            height={32}
            className="size-8 rounded-full ring-2 ring-dark-100"
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveUsers;
