const initialState = {
    logINWindow: false,
    registerWindow: false,
};

const popUpReducer = (state = initialState, action)=>{
    switch(action.type) {
        case 'LogINWindow':
            return {...state, logINWindow:!state.logINWindow};
        case 'RegisterWindow':
            return {...state, registerWindow:!state.registerWindow};
        default:
            return state;
    }
}
export default popUpReducer;