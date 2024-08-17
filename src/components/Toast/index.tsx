import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Toast = () => {
  return createPortal(
    <ToastContainer />, document.body
  );
}

export default Toast;