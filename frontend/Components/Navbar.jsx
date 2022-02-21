import Link from "next/link";
import { useRouter } from "next/router";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="min-w-full  bg-gray-800  py-4 px-2 flex items-center justify-around">
      <Link href="/">
        <p
          className="text-white cursor-pointer"
          style={{ fontFamily: " 'Amatic SC', cursive;" }}
        >
          EASYLEARN
        </p>
      </Link>
      <div className="w-1/4 flex items-center justify-between">
        <Link href="/login">
          <a
            className={`text-gray-400 flex items-center ${
              router.pathname == "/login" && "text-gray-200"
            }`}
          >
            <BiLogIn />
            <p className="px-1 text-sm">Login</p>
          </a>
        </Link>
        <Link href="/register">
          <a
            className={`text-gray-400 flex items-center ${
              router.pathname == "/register" && "text-gray-200"
            }`}
          >
            <AiOutlineUserAdd />
            <p className="px-1 text-sm"> Register</p>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
