import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../Components/Loader";
import { Context } from "../context";
const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (state.user) {
      router.push("/");
    }
  }, [state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`api/register`, {
        name,
        email,
        password,
      });
      toast.success("Registration successfull. Please Login");
    } catch (error) {
      toast.error(error.response.data);
    }
    setLoading(false);
    // console.log("Register response", data);
  };
  return (
    <>
      <div className="sm:hidden md:flex justify-around min-w-fit">
        <div className="mt-28 px-20 py-8  ">
          <h1 className="text-xl">Welcome</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-around h-full"
          >
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="py-2 border-2 px-2 border-gray-200 rounded-sm my-8"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="py-2 border-2 px-2 border-gray-200 rounded-sm mb-8"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="py-2 border-2 px-2 border-gray-200 rounded-sm mb-8"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="py-4 px-12 text-center ease-in text-white bg-gray-900 rounded-md"
              style={{
                boxShadow: "0 0 20px #eee",
                fontSize: "0.8rem",
              }}
              type="submit"
              disabled={!name || !email || !password || loading}
            >
              {loading ? <Loader /> : " REGISTER"}
            </button>
            <p className="mt-4">
              Already Registered?{" "}
              <Link href="/login">
                <a className="text-blue-400 cursor-pointer">Login</a>
              </Link>{" "}
            </p>
          </form>
        </div>

        <div className="mt-40">
          <h1 className="mainhead">Learn more and earn more</h1>
        </div>
      </div>

      <div className="sm:flex md:hidden justify-center">
        <div className="mt-28 px-20 py-8 ">
          <h1 className="text-xl text-center">Welcome</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-around h-full"
          >
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="py-2 border-2 px-2 border-gray-200 rounded-sm my-8"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="py-2 border-2 px-2 border-gray-200 rounded-sm mb-8"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="py-2 border-2 px-2 border-gray-200 rounded-sm mb-8"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="py-4 px-12 text-center ease-in text-white bg-gray-900 rounded-md"
              style={{
                boxShadow: "0 0 20px #eee",
                fontSize: "0.8rem",
              }}
              type="submit"
            >
              REGISTER
            </button>
            <p className="mt-4">
              Already Registered?{" "}
              <Link href="/login">
                <a className="text-blue-400 cursor-pointer">Login</a>
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default register;
