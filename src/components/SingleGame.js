
import { Link } from 'react-router-dom';
const SingleGame = ({post_id, price, place ,title,type}) => {
    return (
        <Link to={`/game/${post_id}`} >
            <div className="singleGame">
                {type==="Xbox" && <h3 className="xbox">{title}</h3>}
                {type==="PS" && <h3 className="ps">{title}</h3>}
                {type==="NS" && <h3 className="ns">{title}</h3>}
                <p>${price}<span>{place}</span></p>
                
            </div>
        </Link>
            );
        }
    

export default SingleGame;