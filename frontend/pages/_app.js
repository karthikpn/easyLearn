import Navbar from "../Components/Navbar";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context, Provider } from "../context";

function App({ Component, pageProps }) {
  return (
    <Provider>
      <div
        className="h-screen "
        style={{ backgroundColor: "white", color: "#101615" }}
      >
        <ToastContainer />
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
export default App;
