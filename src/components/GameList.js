import { useState, useEffect, useRef } from 'react';
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux"
import Loading from './Loading';
import SingleGame from './SingleGame';
import config from "../config/default.json";

const GameList = () => {
    const filter = useSelector((state) => state.filter);
    const [search,setSearch] = useState("");
    const [gameList, setgameList] = useState([]);
    const [loading,setLoading] = useState(false);
    //const [oldgameList, setoldgameList] = useState([]);
    const inputEl = useRef("");

    useEffect(() => {
      const fetchGameList = async (type) => {
        try {
          setLoading(true);
          const response = await fetch(config.apiGameList_for_develop)
          const games2 = await response.json()
          const games = games2.reverse();
          //console.log(games)
          if (filter!== "All"){
            const newgames = games.filter((game) => game.type === filter)
            setgameList(newgames)
            //setoldgameList(newgames)
          }else{
            setgameList(games)
            //setoldgameList(games)
          }
        } catch (error) {
          console.log(error)
        }
        setLoading(false);
      }
      fetchGameList(filter)
    }, [filter])

    const SearchHandler=(value)=>{
      setSearch(value)
    };

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        setLoading(true);
        const body = { "keyword":search };
        const response = await fetch(`${config.apiGameList_for_develop+"/find"}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const games2 = await response.json();
        const games = games2.reverse();
        if (filter!== "All"){
          const newgames = games.filter((game) => game.type === filter)
          setgameList(newgames)
          //setoldgameList(newgames)
        }else{
          setgameList(games)
          //setoldgameList(games)
        }
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    }
 
    return (
      <section className="game-section">
          <div className="section-center">
                <form onSubmit={handleSubmit} className="search">
                  <input ref={inputEl} type="text" placeholder="Search Gamess" value={search} onChange={(e) => SearchHandler(e.target.value)} ></input>
                  <button className="realButton2"type="submit"><i><BiSearch/></i></button>
                </form>
                {loading && <Loading />}
                {!loading && gameList.map((gameitem) => { 
                    return(
                        <SingleGame key={gameitem.post_id} 
                        {...gameitem} 
                        />

                    );
                })}
          </div>
          
      </section>
    )
    }
      
            
  export default GameList;