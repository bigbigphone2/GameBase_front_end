import { Link,useNavigate,useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import {LogOUT} from '../state/action/isLogged'
import {LogINWindow,RegisterWindow} from '../state/action/popUp';
import {filterAll,filterPS,filterXbox,filterNS} from '../state/action/filter';
//import { links } from '../data';
import PopUpScreen from './gadget/PopUpScreen';
import LogIN from '../pages/Account/LogIn';
import Register from '../pages/Account/Register';

function NavBar() {
  const logged = useSelector((state) => state.logged);
  const popUp = useSelector((state) => state.popUp);
  const userName = useSelector(state => state.userInfo).UserName;
  const dispatch= useDispatch();
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  const changeToGameList = ()=>{
    if (location.pathname!=='/'){
      navigate('/')
    }
    toggleLinks();
    
  }
  useEffect(() => {
    // @ts-ignore: Object is possibly 'null'.
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      // @ts-ignore: Object is possibly 'null'.
      linksContainerRef.current.style.height = `${linksHeight+14}px`;
    } else {
      // @ts-ignore: Object is possibly 'null'.
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);

    return (
      <div>
        {popUp.logINWindow && <PopUpScreen><LogIN/></PopUpScreen>}
        {popUp.registerWindow && <PopUpScreen><Register/></PopUpScreen>}
        <nav className='navbar'>
          <div className='nav-center'>
            <div className='nav-header'> 
              <Link to='/'>
                  <div className='nav-logo'>
                    <img src="icon.svg" width="50" height="50" />
                    <h1>GameBase</h1>
                  </div>
              </Link>
              <div className='nav-log'>              
                {!logged && <h4 className='nav-left-font' onClick={()=>dispatch(RegisterWindow())}>Register</h4>}
                {logged && <Link className='nav-left-font' to="personal"><h4>{userName}</h4></Link>}
                {logged ? <h4  className='nav-right-font' onClick={()=>dispatch(LogOUT())}>Log OUT</h4>:<h4 className='nav-right-font' onClick={()=>dispatch(LogINWindow())}>Log IN</h4>}
              </div>

              <button className='nav-toggle' onClick={toggleLinks}>
                {showLinks ?<p>&#8722;</p> : <p>&#43;</p>}
              </button>
            </div>
            <div className='links-container' ref={linksContainerRef}>
              <ul className='links' ref={linksRef}>
                <li onClick={()=>{dispatch(filterAll());changeToGameList()}}>ALL</li>
                <li onClick={()=>{dispatch(filterPS());changeToGameList()}}>Play Station</li>
                <li onClick={()=>{dispatch(filterXbox());changeToGameList()}}>Xbox</li>
                <li onClick={()=>{dispatch(filterNS());changeToGameList()}}>Nintendo</li>
                <li >
                    <Link to= {"/add"} onClick={()=>{toggleLinks()}}>Add New Post</Link> 
                </li>
                {!logged && <li className='nav-log-m' onClick={()=>{dispatch(RegisterWindow());toggleLinks();}}>Register</li>}
                {logged && <Link className='nav-log-m' onClick={()=>{toggleLinks();}} to="personal"><li>{userName}</li></Link>}
                {logged ? <li  className='nav-log-m' onClick={()=>{dispatch(LogOUT());toggleLinks();}}>Log OUT</li>:<li className='nav-log-m' onClick={()=>{dispatch(LogINWindow());toggleLinks();}}>Log IN</li>}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  
  export default NavBar;