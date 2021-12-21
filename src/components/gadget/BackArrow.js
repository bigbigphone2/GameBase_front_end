import {  useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
//import { RootState } from "../state/reducer";
const BackArrow = () => {
    const navigate=useNavigate();

    return (
        <p className="backArrow" onClick={() => navigate(-1)}><IoIosArrowBack/></p>
    )
}
   
export default BackArrow;