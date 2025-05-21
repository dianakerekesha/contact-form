import { Transition } from "vue";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const defaultOptions ={
  position: 'top-right',
  autoClose:5000,
  hideProgressBar:false,
  closeOnClick:true,
  pauseOnHover:true,
  draggable:true,
  theme:'dark',
  transition:'slide'
}

export function useToastify(){
  const success = (message,options={})=>{
    toast.success(message,{...defaultOptions,...options});
  }

  const error = (message,options={})=>{
    toast.error(message,{...defaultOptions,...options});
  }

  return {success,error}
};