import { useHistory } from "react-router-dom";

export const _logout=(e)=> {
    // const _history = useHistory();
    document.cookie = "fltk=''"+";path=/";
    document.cookie = "flid=''" +";path=/";
    document.cookie = "fln=" +";path=/";
    document.cookie = "user_id=" +";path=/";
    document.cookie = "email=" +";path=/";
    document.cookie = "chat_id=" +";path=/";
    document.cookie = "user_name=" +";path=/";
    document.cookie = "region_id=" +";path=/";
    document.cookie = "region_name=" +";path=/";
    document.cookie = "roles=" +";path=/";
//筆記: 有出現同名cookie的現象，結果是因為path或max-age參數如果不同會被認為不同cookie
//另外cookie的預設max-age是-1，即關閉瀏覽器就會刪除
    // console.log("logout!")
    // console.log(document.cookie);
    // _history.push('/login') 
  }