import Link from "next/link";
import { useRouter } from "next/router";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { Context } from "../context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const { state, dispatch } = useContext(Context);
  const handleLogout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      const { data } = await axios.get("/api/logout");

      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <nav className="min-w-full    py-4 px-2 flex items-center justify-around">
        <Link href="/">
          <p
            className=" cursor-pointer inline-block font-extrabold"
            style={{ color: "#17937B" }}
          >
            LEARN
          </p>
        </Link>
        <div className="w-1/4 flex items-center justify-between">
          {!state.user && (
            <Link href="/login">
              <a
                className={` flex items-center ${
                  router.pathname == "/login" && "border-b-2 border-green-400"
                }`}
              >
                <BiLogIn />
                <p className="px-1 py-1 text-sm">Login</p>
              </a>
            </Link>
          )}
          {!state.user && (
            <Link href="/register">
              <a>
                <button
                  className="px-4 py-2 text-white text-sm shadow-xl rounded-md"
                  style={{ backgroundColor: "#17937B" }}
                >
                  Join for free
                </button>
              </a>
            </Link>
          )}
        </div>
        {state.user && (
          <div className="flex flex-col h-full">
            <button onClick={() => setToggle(!toggle)}>
              <Avatar alt={state.user.name} src="/static/images/avatar/1.jpg" />
            </button>
            {toggle && (
              <div className="absolute right-30 w-32 bg-gray-700 top-16 rounded-sm z-10">
                <Link href="/user" className="py-4 w-full">
                  <a>
                    <p
                      className={`text-gray-400 text-lg flex items-center justify-around hover:text-green-400`}
                    >
                      <AiOutlineLogout />
                      <p className="px-1 text-sm ">Profile</p>
                    </p>
                  </a>
                </Link>
                <button className="py-4 w-full" onClick={handleLogout}>
                  <p
                    className={`text-gray-400 text-lg flex items-center justify-around hover:text-red-400`}
                  >
                    <AiOutlineLogout />
                    <p className="px-1 text-sm ">logout</p>
                  </p>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
