import constants from './../../constants';


const initialState = {
    formData:{
        taskName : '',
        taskDetails : '',
        startDate:'',
        endDate: '',
        formError : {
            taskName : '',
            taskDetails : '',
            startDate : '',
            endDate : ''
        },
        hasError : false
    }
}

export default (state = initialState , {type,payload}) => {
    switch(type) {
        case constants.TODO_REGISTER_ERROR : 
            return {
                ...state,
                formData : {
                    ...state.formData,
                    formError : payload.formError,
                    hasError : payload.hasError 
                }   
            }

        case constants.TODO_HANDLE_FORM_DATA : 
                return {
                    ...state,
                    formData : {
                        ...state.formData,
                        formError : {
                            ...state.formData.formError,
                            ...payload.formError
                        }
                    }
                }

        case constants.TODO_UPDATE_FORM_FIELD :
            return {
                ...state,
                formData : {
                    ...state.formData,
                    [payload.name] : payload.value
                }
            } 

        case constants.TODO_EMPTY_FORM_FIELD : 
            return {
                ...state,
                formData : {
                    ...state.formData,
                    taskName : '',
                    taskDetails : '',
                    startDate : '',
                    endDate : ''
                }
            }

        case constants.TODO_PREPOPULATE_EDIT : 
            const temp =  {
                ...state,
                formData : {
                    ...state.formData,
                    ...payload
                }
            }
            return temp;

        default : return state;
    }
}