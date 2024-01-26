import s from "./toast.module.css";
import { ToastContainer, Zoom } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      toastClassName={s.custom_toast}
      position="top-center"
      transition={Zoom}
      autoClose={1500}
      closeButton={false}
      hideProgressBar={true}
    />
  );
};

export default Toast;
