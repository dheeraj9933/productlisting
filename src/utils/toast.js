import { toast } from 'react-toastify';
// toast types : success, warn, error, info
export default function (message, type = 'success') {
  if (message !== '') {
    toast[type](message, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
}
