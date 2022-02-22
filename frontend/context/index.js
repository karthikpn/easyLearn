import axios from "axios";
import { useRouter } from "next/router";
import { useReducer, createContext, useEffect } from "react";

const initialState = {
  user: null,
};

const Context = createContext();

//reducers
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

//provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(user),
      });
    }
  }, []);

  const router = useRouter();
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      //4XX status

      let res = error.response;
      if (
        res?.status === 401 &&
        res?.config &&
        !res?.config?.__isRetryRequest
      ) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              dispatch({ type: "LOGOUT" });
              localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTOR ERROR", err);
              reject(err);
            });
        });
      }

      return new Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");

      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export { Context, Provider };
