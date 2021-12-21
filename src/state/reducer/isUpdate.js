const initialState = -1;

const isUpdateReducer = (state = initialState,action) =>{
  switch(action.type){
    case 'isUpdate':
      return state+1;
    default:
      return state;
  }
}

export default isUpdateReducer; 