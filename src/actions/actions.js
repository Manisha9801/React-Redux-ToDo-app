import axios from './../axios';
import constants from './../constants'


export const showLoader=()=>{
    return {
        type: "SHOW_LOADER",
        payload:true
    }
}  

export const hideLoader=()=>{
    return {
        type: constants.TODO_HIDE_LOADER,
        payload:false
    }
}  

export const GetList = () =>{
    return (dispatch)=>{
        let taskList=null;
        dispatch(showLoader());
        axios.get('/tasks.json')
        .then(response => {
            if(response.data === null) {
                taskList = {};
            }else{
                taskList=response.data;
            }
            dispatch({
                type: constants.TODO_GET_LIST,
                payload: taskList 
            })
        }).catch(err=>{
            dispatch({
                type: constants.TODO_GET_LIST,
                payload: [] 
            })
        });
    }
}

export const deleteTask = (taskId) => {
    return (dispatch) => {
        dispatch(showLoader());
        axios.delete('/tasks/' + `${taskId}.json`)
        .then((response) => {
            dispatch(GetList());
        }).catch(error => alert(error));
    }
}


export const registerFormError = (hasError, formError) => {
    return({
        type : constants.TODO_REGISTER_ERROR,
        payload : {
            hasError,
            formError
        }
    });
}


export const changeHandler = (formError,name,value) => {
    return({
        type : constants.TODO_HANDLE_FORM_DATA,
        payload : {
            formError,
            name,
            value
        }
    });
}


export const changeFormField = (name,value) => {
    return {
        type : constants.TODO_UPDATE_FORM_FIELD,
        payload : {
            name,
            value
        }
    }
}


export const emptyFormField = () => {
    return {
        type : constants.TODO_EMPTY_FORM_FIELD,
        payload : ''
    }
}


export const prePopulateFormField = (taskName,taskDetails,startDate,endDate) => {
    return {
        type : constants.TODO_PREPOPULATE_EDIT,
        payload : {
           taskName,
           taskDetails,
           startDate,
           endDate
        }
    }
}