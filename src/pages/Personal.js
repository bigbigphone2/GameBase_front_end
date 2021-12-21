import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"

import PersonalSingleGame from '../components/PersonalSingleGame';
import config from "../config/default.json";
import BackArrow from '../components/gadget/BackArrow';


const Personal = () => {
    const userID = useSelector((state) => state.userInfo).UserID;
    const [gameList, setgameList] = useState([]);
    const userName = useSelector((state) => state.userInfo).UserName;
    const isUpdate = useSelector((state) => state.isUpdate);
    useEffect(() => {
      const fetchGameList = async () => {
        try {
            const response = await fetch(`${config.apiGameList_for_develop+"/user/"+userID}`)
            const games2 = await response.json()
            const games = games2.reverse();
            console.log(games)
            setgameList(games)
        } catch (error) {
          console.log(error)
        }
      }
      fetchGameList()
    }, [isUpdate])

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
                        <PersonalSingleGame key={gameitem.post_id} 
                        {...gameitem} 
                        />

                    );
                })}
            </div>
            
        </section>
      </div>
    )
    }
      
            
  export default Personal;