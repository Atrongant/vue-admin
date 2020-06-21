import { MessageBox } from "element-ui";
import {ref} from "@vue/composition-api";
export function global(){
  const str=ref("");
  const confirm=()=>{
    console.log('global2.js/6:\t',66666666);
  }
  return {
    str,
    confirm
  }
}