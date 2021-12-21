import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import {filterAll,filterPS,filterXbox,filterNS} from '../state/action/filter'
//import { RootState } from "../state/reducer";

const Filter = () => {
    const filter = useSelector((state) => state.filter);
    const dispatch= useDispatch();
    return (
        <div className="filter_canvas">
            <h3>{filter}</h3>
            <ul className='filter'>
                <li onClick={()=>dispatch(filterAll())}>ALL</li>
                <li onClick={()=>dispatch(filterPS())}>Play Station</li>
                <li onClick={()=>dispatch(filterXbox())}>Xbox</li>
                <li onClick={()=>dispatch(filterNS())}>Nintendo</li>
                <li >
                    <Link to= {"/add"}>Add New Post</Link> 
                </li>
                
            </ul>
        </div>
    )
}
   
export default Filter;