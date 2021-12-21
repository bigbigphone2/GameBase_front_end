import isLoggedReducer from './isLogged';
import filerReducer from './filter';
import popUpReducer from './popUp';
import UserInfoReducer from './userInfo';
import isUpdateReducer from './isUpdate';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    logged: isLoggedReducer,
    filter: filerReducer ,
    popUp : popUpReducer,
    userInfo : UserInfoReducer,
    isUpdate : isUpdateReducer
}) 
export default allReducers;
// export type RootState = ReturnType<typeof allReducers>;