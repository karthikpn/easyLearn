import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { Context } from "../context";

const login = () => {
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
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login Success");
      router.push("/");
    } catch (error) {
      toast.error(error.response.data);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="sm:flex justify-center">
        <div className="mt-28 px-20 py-8 ">
          <h1 className="text-xl text-center pb-10">Login</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-around h-full"
          >
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
              {loading ? <Loader /> : "LOGIN"}
            </button>
            <p className="mt-4">
              Not yet registered?{" "}
              <Link href="/register">
                <a className="text-blue-400 cursor-pointer">Register</a>
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
