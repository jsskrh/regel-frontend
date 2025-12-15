import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="w-full py-6 fixed top-0 flex items-center z-999">
      <div className="lg:mx-9 w-full lg:h-18 flex items-center">
        <div className="flex items-center justify-between container px-6 lg:px-16 w-full">
          <Link href={`/`} className="flex">
            <Image
              className="size-15"
              src="/logo.png"
              alt="Regel technology logo"
              width={60}
              height={60}
              priority
            />
          </Link>

          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
