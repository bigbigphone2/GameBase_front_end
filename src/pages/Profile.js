import { useParams} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux"

import SingleGame from '../components/SingleGame';
import config from "../config/default.json";
import BackArrow from '../components/gadget/BackArrow';

const Profile = () => {
    const { id } = useParams()
    const filter = useSelector((state) => state.filter);
    const [gameList, setgameList] = useState([]);
    const [userName,setUserName] = useState("")

    useEffect(() => {
      const fetchGameList = async (type) => {
        try {
            const response = await fetch(`${config.apiGameList_for_develop+"/user/"+id}`)
            const games2 = await response.json()
            const games = games2.reverse();
            setgameList(games)
            const response2 = await fetch(`${config.apiUserList+"/"+games[0].user_id}`)
            const userName2 = await response2.json()
            setUserName(userName2)
        } catch (error) {
          console.log(error)
        }
      }
      fetchGameList(filter)
    }, [filter])

    return (
      <div style={{marginTop:'20px'}}>
        <BackArrow/>
        <section className='profileSection'>
            <div className='profilePersonal'>              
              <p className='profileUserName'>{userName}</p>
            </div>
            <div className="profile-center">
                {gameList.map((gameitem) => {
                    return(
                        <SingleGame key={gameitem.post_id} 
                        {...gameitem} 
                        />

                    );
                })}
            </div>
            
        </section>
      </div>
    )
    }
      
            
  export default Profile;