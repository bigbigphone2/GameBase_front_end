import { useParams, Link } from 'react-router-dom';
import { useState, useEffect,} from 'react';
import {ImPriceTags} from "react-icons/im";
import { MdPerson, MdPlace, MdContactPhone} from "react-icons/md";
import Loading from '../components/Loading';
import config from "../config/default.json";
import BackArrow2 from '../components/gadget/BackArrow2';

export default function Product() {
    const { id } = useParams()
    const [datetime,setdatetime]= useState("")
    const [loading, setLoading] = useState(true)
    const [game, setgame] = useState([])
    const [userName,setUserName] = useState("")
    useEffect(() => {
      const fetchGame = async () => {
        setLoading(true)
        try {
          const response = await fetch(`${config.apiGameList_for_develop+"/"+id}`)
          const games = await response.json()
          console.log(games)
          setLoading(false)
          setgame(games[0])
          setdatetime(()=>{
            for (var i=0; i<games[0].create_date.length;i++){
              if (games[0].create_date[i]==="T"){
                return games[0].create_date.substring(0,i)
              }
            }
          })
          const response2 = await fetch(`${config.apiUserList+"/"+games[0].user_id}`)
          const userName2 = await response2.json()
          setUserName(userName2)
        } catch (error) {
          setLoading(false)
        }
      }
      fetchGame()
    }, [])
    
    if (loading) {
        return (
          <main>
            <Loading />
          </main>
        )
    }
    else{
        const {user_id, title, price, place, contact, content} = game;
        return (
            <main className="Game_Page">
                <BackArrow2/>
                <div className="game_canvas">
                    
                    <div >
                        <h3>{title}</h3>
                        <div className="game_information">
                          <div className="game_information_some">
                            <span><ImPriceTags/></span>
                            <p>${price}</p>
                          </div>
                          <p>{datetime}</p>
                        </div>
                        <div className="game_information">
                          <div className="game_information_some">
                            <span><MdPerson/></span>
                            <Link to={`/user/${user_id}`} className='username'>{userName}</Link>
                          </div>
                          <div className="game_information_some">
                            <span><MdPlace/></span>
                            <p>{place}</p>
                          </div>
                          <div className="game_information_some">
                            <span><MdContactPhone/></span>
                            <p >{contact}</p>
                          </div>
                        </div>
                        <p>{content}</p>
                    </div>
                </div>

                
            </main>
        )
    }
  }