
import { Link } from 'react-router-dom';
import config from "../config/default.json";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {isUpdate} from '../state/action/isUpdate'
import { BiTrash,BiPencil } from "react-icons/bi";
const PersonalSingleGame = ({post_id, price, place ,title,type}) => {
    const dispatch= useDispatch();
    const handleDelete = (e) =>{
        const data ={post_id:post_id};
        const options = {
          url: `${config.apiGameList_for_develop+"/delete"}`,
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'x-auth-token': localStorage.getItem('token')
          },
          data: data
        };
        axios(options)
              .then(response=>{
                  alert("Successfully Deleted the Post.");   
                  dispatch(isUpdate());
              })
              .catch(err=>{
                alert("Server Error, Please Try it Later."); 
                })
      }
    return (
        <div className="personalGameWrap">
            <Link to={`/game/${post_id}`} >
                <div className="personalGame">
                    {type==="Xbox" && <h3 className="xbox">{title}</h3>}
                    {type==="PS" && <h3 className="ps">{title}</h3>}
                    {type==="NS" && <h3 className="ns">{title}</h3>}
                    <p>${price}<span>{place}</span></p>
                    
                </div>
            </Link>
            <div style={{display: 'flex'}}>
                <div className="personalGameEdit">
                    <Link to={`/edit/${post_id}`} >
                        <BiPencil />
                    </Link>
                </div>
                <div className="personalGameDelete">
                    <BiTrash onClick={handleDelete}/>
                </div>
            </div>

            
        </div>
            );
        }
    

export default PersonalSingleGame;