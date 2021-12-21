import { useParams, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import config from "../config/default.json";
import { useSelector} from "react-redux";
import BackArrow2 from '../components/gadget/BackArrow2';
export default function EditGame() {
    const { id } = useParams()
    const { t } = useTranslation();
    const userID = useSelector((state) => state.userInfo).UserID;
    const [postID,setPostID] = useState(-1);
    const [title,setTitle] = useState('');
    const [type, setType] = useState('PS');
    const [price,setPrice] = useState(0);
    const [place,setPlace] = useState('');
    const [contact,setContact] = useState('');
    const [content,setContent] = useState('');
    const [problem,setProblem] = useState(false);
    const [problemDetail,setProblemDetail] = useState('');
    const navigate=useNavigate();
    useEffect(() => {
        const fetchGame = async () => {
          try {
            const response = await fetch(`${config.apiGameList_for_develop+"/"+id}`);
            const games = await response.json();
            setPostID(games[0].post_id)
            setTitle(games[0].title);
            setType(games[0].type);
            setPrice(games[0].price);
            setPlace(games[0].place);
            setContact(games[0].contact);
            setContent(games[0].conent);
          } catch (error) {
              alert("Server Error");
          }
        }
        fetchGame()
      }, [])
    const handleSubmit = (e) =>{
      e.preventDefault();
      const data ={user_id:userID,post_id:postID, title, content, price, place, contact,type};
      const options = {
        url: `${config.apiGameList_for_develop+"/edit"}`,
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'x-auth-token': localStorage.getItem('token')
        },
        data: data
      };
      axios(options)
            .then(response=>{
                alert("Successfully edit the post.");  
                navigate(-1)
                setProblem(false)
            })
            .catch(err=>{
              setProblem(true)
              setProblemDetail(err.response.data)})
    }
    return (
      <main className="add_main">
            <div className="Game_Page">
            <BackArrow2/>
              <form onSubmit={handleSubmit} className="add_main_form_part">
                <h2>Edit Game Post</h2>
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
                        <select value={type} onChange={(e)=>setType(e.target.value)}>
                            <option value="PS">PlayStation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="NS">Nintendo</option>
                        </select>
                        <p>{t('Description')}:</p>
                        <textarea  placeholder="You may jot down anything necessary here." value={content} onChange={(e)=>setContent(e.target.value)} cols="30" rows="10"></textarea>
                        <br/>
                        <input type="submit" value="Update the Post" />
                    </div>
                </div>
                <div className="Game_Page_warning">
                  {problem && <div>{problemDetail}</div>}
                </div>
              </form>
            </div>

      </main>
    )
  }