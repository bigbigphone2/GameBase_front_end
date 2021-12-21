const initialState = {
    UserID: -1,
    UserName: ""
};

const UserInfoReducer = (state = initialState, action)=>{
    switch(action.type) {
        case 'UserName':
            return {...state, UserName:action.payload};
        case 'UserID':
            return {...state, UserID:action.payload};
        default:
            return state;
    }
}
export default UserInfoReducer;