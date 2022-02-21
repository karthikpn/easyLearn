import Navbar from "../Components/Navbar";
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }) {
  return (
    <div className="h-screen">
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
export default App;
