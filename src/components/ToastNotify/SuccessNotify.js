import { toast } from "react-toastify";

const SuccessNotify = (msg) =>
toast.success(msg, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
export default SuccessNotify;