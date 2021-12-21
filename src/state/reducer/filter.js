const initialState = "All";

const filterReducer = (state = initialState,action) =>{
  switch(action.type){
    case 'FilterAll':
      return "All"
    case 'FilterPS':
      return "PS"
    case 'FilterXbox':
      return "Xbox"
    case 'FilterNS':
      return "NS"
    default:
      return state;
  }
}

export default filterReducer; 