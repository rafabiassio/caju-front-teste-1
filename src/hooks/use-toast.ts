import { toast, ToastOptions } from "react-toastify"

const useToast = () => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 4000,
    theme: 'colored',
    hideProgressBar: true,
    closeButton: false
  }

  const notifySuccess = (message: string) => {
    toast.success(message, options)
  }

  const notifyError = (message: string) => {
    toast.error(message, options)
  }

  return {
    notifySuccess,
    notifyError
  }

}

export default useToast;