import { useState } from 'react';
import { useDispatch } from "react-redux";
import {LogINWindow,RegisterWindow} from '../../state/action/popUp';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import config from "../../config/default.json";

export default function Register() {
  const { t } = useTranslation();
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password2, setPassword2] = useState('');
    const [password, setPassword] = useState('');
    
    const [problem,setProblem] = useState(true);
    const [problemDetail,setProblemDetail] = useState('');
    // const logged = useSelector((state) => state.logged);
    const dispatch= useDispatch();
    const handleSubmit = (e)=>{
      e.preventDefault();
      if (password!==password2){
          setProblem(true);
          setProblemDetail("Two password are not the same");
          return
      }
      handleRegister();
    }
    const handleRegister = (e) =>{      
      const data ={name,email,password};
      const options = {
        url: `${config.apiUserList+"/create_user"}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
      };
      axios(options)
            .then(response=>{
              dispatch(RegisterWindow());
              window.alert("You have successfully created an account")
            })
            .catch(err=>{
              setProblem(true)
              setProblemDetail(err.response.data)})
    }
    const handleChangeLogIn=()=>{
        dispatch(LogINWindow());
        dispatch(RegisterWindow());
      }
    return (
            <div className="PopUp">
              <p className="Cross" onClick={()=>dispatch(RegisterWindow())}>&#215;</p>
              <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="add_main_content_part">
                    <div className="add_main_content_part_block1">
                        <p>{t('UserName')}:</p>
                        <input type="text" placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <p>{t('Email')}:</p>
                        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <p>{t('Password')}:</p>
                        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <p>{t('RepeatPassword')}:</p>
                        <input type="password" placeholder="Repeat Password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                        <input className="realButton" type="submit" value="Register" />
                    </div>
                </div>
                <div className="Comment">
                    <p>Already have an account?  </p>
                    <p className='Button' onClick={()=>{handleChangeLogIn()}}>Log IN</p>
                </div>
                
                <div className="Game_Page_warning">
                  {problem && <div>{problemDetail}</div>}
                </div>
              </form>
            </div>
    )
  }