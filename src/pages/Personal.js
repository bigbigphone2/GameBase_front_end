import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"

import Loading from '../components/Loading';
import PersonalSingleGame from '../components/PersonalSingleGame';
import config from "../config/default.json";
import BackArrow from '../components/gadget/BackArrow';


const Personal = () => {
    const userID = useSelector((state) => state.userInfo).UserID;
    const [gameList, setgameList] = useState([]);
    const userName = useSelector((state) => state.userInfo).UserName;
    const isUpdate = useSelector((state) => state.isUpdate);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
      const fetchGameList = async () => {
        try {
          setLoading(true);
            const response = await fetch(`${config.apiGameList_for_develop+"/user/"+userID}`)
            const games2 = await response.json()
            const games = games2.reverse();
            setgameList(games)
        } catch (error) {
          console.log(error)
        }
        setLoading(false);
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
            {loading && <Loading />}
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