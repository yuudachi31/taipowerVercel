import { useHistory } from "react-router-dom";


function Home() {
  const _history = useHistory();

  
  const _login_status = document.cookie.split('; ').find(row => row.startsWith('user_name'))? true:false;
  var _group_id ;
  var _username ;
  if(_login_status){
    _group_id = document.cookie.split('; ').find(row => row.startsWith('flid')).split('=')[1];
    _username = document.cookie.split('; ').find(row => row.startsWith('user_name')).split('=')[1];
  }


  return (
    <>
    {_login_status ?
    <>
      <div className="w-full flex justify-center ">

      <div></div>
    </div>
    </>:<>
    { _history.push('/login')}
    </>
    }
    </>
  );
}
export default Home;
