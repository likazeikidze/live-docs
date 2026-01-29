import Link from "next/link";
import Image from "next/image";
import { HeaderProps } from "@/types";

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/logo-icon.svg"
            alt="logo"
            width={32}
            height={32}
            className="hidden md:block"
          />
          <p className="logo-title">Live Docs</p>
        </div>

        <Image
          src="/assets/icons/logo-icon.svg"
          alt="logo"
          width={32}
          height={32}
          className="block md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
