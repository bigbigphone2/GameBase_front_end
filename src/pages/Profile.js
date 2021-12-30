import { useParams} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux"
import Loading from '../components/Loading';
import SingleGame from '../components/SingleGame';
import config from "../config/default.json";
import BackArrow from '../components/gadget/BackArrow';

const Profile = () => {
    const { id } = useParams()
    const filter = useSelector((state) => state.filter);
    const [gameList, setgameList] = useState([]);
    const [userName,setUserName] = useState("");
    const [loading,setLoading] = useState(false);

    useEffect(() => {
      const fetchGameList = async (type) => {
        try {
            setLoading(true);
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
        setLoading(false);
      }
      fetchGameList(filter)
    }, [filter])

    return (
      <div style={{marginTop:'20px'}}>
        <BackArrow/>
        {loading && <Loading />}
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