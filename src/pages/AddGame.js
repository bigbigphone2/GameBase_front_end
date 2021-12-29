import { useState,useEffect } from 'react';
import  { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import {  Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import config from "../config/default.json";
import { useSelector,useDispatch} from "react-redux";
import {LogINWindow} from '../state/action/popUp';

export default function AddGame() {
    const { t } = useTranslation();
    const userID = useSelector((state) => state.userInfo).UserID;
    const logged = useSelector((state) => state.logged);
    const [title,setTitle] = useState('');
    const [type, setType] = useState('PS');
    const [price,setPrice] = useState(0);
    const [place,setPlace] = useState('');
    const [contact,setContact] = useState('');
    const [content,setContent] = useState('');
    const [problem,setProblem] = useState(true);
    const [problemDetail,setProblemDetail] = useState('');
    const dispatch= useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      const redirect = () => {
        
        if (!logged){
          
          dispatch(LogINWindow());
          navigate('/')
          
        }
      }
      redirect();
      
    },[''])


    const handleSubmit = (e) =>{
      e.preventDefault();
      const data ={user_id:userID,title, content, price, place, contact,type};
      const options = {
        url: `${config.apiGameList_for_develop+"/create_post"}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'x-auth-token': localStorage.getItem('token')
        },
        data: data
      };
      axios(options)
            .then(response=>{
                alert("Successfully created a new post.");   
                setProblem(true)
            })
            .catch(err=>{
              setProblem(false)
              setProblemDetail(err.response.data)})
    }
    return (
      <main className="add_main">
            <div className="Game_Page">
              <Link to='/' className="back"><IoIosArrowBack/></Link>
              <form onSubmit={handleSubmit} className="add_main_form_part">
                <h2>Create a Game Post</h2>
                <div className="add_main_content_part">
                    <div className="add_main_content_part_block1">
                        <p>{t('ListingTitle')}:</p>
                        <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <p>{t('Price')}:</p>
                        <input type="number" min="0.00" max="10000.00" step="1" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        <p>{t('MeetUpPlace')}:</p>
                        <input type="text" placeholder="Place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
                        <p>{t('Contact Method')}:</p>
                        <input type="text" placeholder="TG/Phone Number" value={contact} onChange={(e)=>setContact(e.target.value)}/>
                    </div>
                    <div className="add_main_content_part_block2">
                    <p>{t('SuitForConsole')}:</p>
                        <select onChange={(e)=>setType(e.target.value)}>
                            <option value="PS">PlayStation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="NS">Nintendo</option>
                        </select>
                        <p>{t('Description')}:</p>
                        <textarea  placeholder="You may jot down anything necessary here." value={content} onChange={(e)=>setContent(e.target.value)} cols="30" rows="10"></textarea>
                        <br/>
                        <input type="submit" value="Create a New Post" />
                    </div>
                </div>
                <div className="Game_Page_warning">
                  {!problem && <div>{problemDetail}</div>}
                </div>
              </form>
            </div>

      </main>
    )
  }