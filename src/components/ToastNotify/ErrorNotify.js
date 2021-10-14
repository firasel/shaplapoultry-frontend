import { toast } from "react-toastify";

const ErrorNotify = (msg) =>
toast.error(msg, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
export default ErrorNotify;