import { useState } from 'react';
import { useDispatch } from "react-redux";
import {SignIN} from '../../state/action/isLogged';
import {LogINWindow,RegisterWindow} from '../../state/action/popUp';
import {UserID,UserName} from '../../state/action/userInfo'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import config from "../../config/default.json";
import jwt from 'jwt-decode';

export default function LogIN() {
    const { t } = useTranslation();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [problem,setProblem] = useState(true);
    const [problemDetail,setProblemDetail] = useState('');
    // const logged = useSelector((state) => state.logged);
    const dispatch= useDispatch();

    const handleSubmit = (e) =>{
      e.preventDefault();
      const data ={email,password};
      const options = {
        url: `${config.apiUserList+"/login"}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data
      };
      axios(options)
            .then(response=>{
                if (response.data==="Wrong Password"){
                  setProblem(true)
                  setProblemDetail(response.data)
                  return
                }
                localStorage.setItem('token',response.data.accessToken)
                dispatch(SignIN());
                dispatch(LogINWindow());
                const user = jwt(localStorage.getItem('token')); 
                dispatch(UserName(user.name));
                dispatch(UserID(user.id));
                
            })
            .catch(err=>{
              setProblem(true)
              setProblemDetail(err.response.data)})
    }
    const handleChangeRegister=()=>{
      dispatch(LogINWindow());
      dispatch(RegisterWindow());
    }
    return (
          <div className="PopUp">
            <p className="Cross" onClick={()=>dispatch(LogINWindow())}>&#215;</p>
            <form onSubmit={handleSubmit} >
              <h2>Log IN</h2>
              <div className="add_main_content_part">
                  <div className="add_main_content_part_block1">
                      <p>{t('Email')}:</p>
                      <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                      <p>{t('Password')}:</p>
                      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                      <input className="realButton" type="submit" value="Log IN" />
                  </div>
              </div>
              <div className="Comment">
                <p>Don't have an account?   </p>
                <p className='Button' onClick={()=>{handleChangeRegister()}}>Sign UP</p>
              </div>
              
              <div className="Game_Page_warning">
                {problem && <div>{problemDetail}</div>}
              </div>
            </form>
          </div>
    )
  }