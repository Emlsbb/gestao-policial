//Requisição de bibliotecas
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "./assets/global.css";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={1}
        theme="colored"
      />
    </>
  );
};
