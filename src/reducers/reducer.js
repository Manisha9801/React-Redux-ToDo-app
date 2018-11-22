import constants from './../constants'

const default_state = {
    list : [],
    isLoading : false
}

export default (state = default_state, {type, payload}) =>{
    switch (type) {
    case constants.TODO_SHOW_LOADER:
        return {
            ...state,
            isLoading: true
        }
    case constants.TODO_HIDE_LOADER:
        return {
            ...state,
            isLoading: false
        }
    case constants.TODO_GET_LIST:
        return {
            ...state,
            list: payload,
            isLoading:false                 
        }
    case constants.TODO_ADD_LIST : 
        return{
           ...state
        } 
    default:
        return state;
    }

} 