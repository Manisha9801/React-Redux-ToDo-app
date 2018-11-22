import React, {Component} from 'react';
import {Form , FormGroup, Label, Input, FormText, Col, Button} from 'reactstrap';
import axios from './../../axios';
// import {Redirect} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './InputForm.css';
import ErrorWrapper from './../ErrorWrapper/ErrorWrapper';
import Spinner from './../UI/Spinner/Spinner';
import {registerFormError,changeHandler ,changeFormField,emptyFormField,showLoader,prePopulateFormField,hideLoader} from './../../actions/actions';

class InputForm extends Component {
   
    componentWillMount() {
        // console.log('props',this.props);
        if(this.props.match.params.id !== undefined) {
            // this.setState({loader : true});

            // get task details 

            this.props.showLoader();  
            axios.get('/tasks/' + this.props.match.params.id  + '.json')
            .then((response) => {
                // console.log('response',response.data);
                this.props.hideLoader();  
                const temp = {...response.data};
                this.props.prePopulateFormField(temp.taskName,temp.taskDetails,temp.startDate,temp.endDate);
                // this.setState({taskName : temp.taskName, taskDetails : temp.taskDetails, startDate: temp.startDate, endDate :temp.endDate,loader:false});
            });
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     // if(nextProps.match.url !== this.props.match.url) {
    //     //     this.props.emptyFormField();
    //     // }
    // }

    handleSubmit =(event) => {
        event.preventDefault();
        let {formError,hasError} = {...this.props.formData}
        console.log(formError);
        Object.keys(formError).map((element) => {
            const temp = formError[element] = this.props.formData[element].length === 0 ? 'This field is required': formError[element];
            if(formError[element].length>0) {
                hasError = true;
            }
            else {
                hasError = false;
            }
            return temp;
        });
        this.props.registerFormError(hasError,formError);
        // this.setState({hasError : hasError,formError : formError});
        if(hasError === false){
            this.props.showLoader();
            const formData = {...this.props.formData};
            delete formData.formError;
            delete formData.hasError;
            if(this.props.match.params.id !== undefined){
                axios.put(`/tasks/${this.props.match.params.id}.json`,formData)
                .then((response) => {
                    this.props.hideLoader();
                    this.props.history.replace('/task-list');
                }).catch(error => alert(error));
            }else {
                axios.post('/tasks.json',formData)
                .then((response) => {
                    this.props.history.replace('/task-list');
                })
                .catch(error => alert(error));
                }
        }else {
            alert("Please fill form correctly to proceed");
        }
    }


    handleChange = (event) => {
        const {name,value} = event.target;
        let formError = {...this.props.formData.formError}
        switch(name) {
            case 'taskName' : formError.taskName = value.length === 0 ?'This field is required': (value.length<3 ? 'minimum length should be 3' : '');
                break;
            case 'taskDetails' : formError.taskDetails = value.length ===0 ? 'This field is required ' : (value.length<10 ? 'minimum length should be 10' : '');
                break;
            // case 'startDate' : formError.startDate = value.length === 0 ? 'This field is required' : (this.props.formData.endDate ==='' ?'': (this.compareDate(name,value) ? '': 'Start date should be smaller than end date'));
            //     break;
            case 'startDate' : if(value.length ===0) {
                                    formError.startDate = 'This field is required'
                                }
                                else {
                                    if(this.props.formData.endDate==='') {
                                        formError.endDate = '';
                                        formError.startDate = '';
                                    }
                                    else {
                                        if(this.compareDate(name,value)) {
                                            formError.endDate = '';
                                            formError.startDate = '';
                                        }else {
                                            formError.startDate='Start date should be smaller than end date';
                                        }
                                    }
                                }
                                break;
            // case 'endDate' : formError.endDate = value.length === 0 ? 'This field is required' : (this.props.formData.startDate === '' ? '' : (this.compareDate(name,value) ? '' : 'End date should be greater than start date'));
            //     break;

            case 'endDate' : if(value.length === 0) {
                                formError.endDate = 'This field is required'
                            }
                            else {
                                if(this.props.formData.startDate === '') {
                                    formError.startDate = '';
                                    formError.endDate = '';
                                }
                                else {
                                    if(this.compareDate(name,value)) {
                                        formError.startDate = '';
                                        formError.endDate = '';
                                    }
                                    else {
                                        formError.endDate='End date should be greater than start date';
                                    }
                                }
                            }

            default : break;
        }
        this.props.changeHandler(formError,name,value);
        // this.setState({formError,[name] : value});
    }

    compareDate = (name,value) => {
       const d1 = new Date(value);;
       return name === 'startDate' ? (new Date(this.props.formData.endDate)).getTime()>d1.getTime() : (new Date(this.props.formData.startDate)).getTime()<d1.getTime(); 
    }

    change =(e) => {
        this.props.changeFormField(e.target.name,e.target.value);
        }

    render() {

        const formError = {...this.props.formData.formError}
        // {console.log('formData',this.props.formData.formError)}
        return(
            <div>
                {this.props.isLoading ? <Spinner /> : 
                <Form className="input-form" onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label sm={4} for="taskName" > Enter your task name </Label>
                    <Col sm={7}>
                    <Input onChange={this.change} onBlur={this.handleChange}  type="text" name = "taskName" value={this.props.formData.taskName} />
                        <FormText>Example : Exercise</FormText>
                        {formError.taskName.length>0 && (<ErrorWrapper message={formError.taskName} />) }
                    </Col>
                    </FormGroup>
        
                    <FormGroup row>
                        <Label sm={4} for="taskDetails" > Enter your task details </Label>
                        <Col sm={7}>
                        <Input onChange={this.change} onBlur={this.handleChange} type="text" name = "taskDetails" value={this.props.formData.taskDetails} />
                        <FormText>Example : Exercise plan for a week</FormText>
                        {formError.taskDetails.length>0 && (<ErrorWrapper message={formError.taskDetails} />) }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4} for="startDate" > Pick Starting Date </Label>
                        <Col sm={7}>
                        <Input onChange={this.change} onBlur={this.handleChange} type="date" name = "startDate" value={this.props.formData.startDate} />
                            <FormText>Pick date</FormText>
                            {formError.startDate.length>0 && (<ErrorWrapper message={formError.startDate} />) }
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4} for="endDate" > Pick Ending Date </Label>
                        <Col sm={7}>
                            <Input onChange={this.change} onBlur={this.handleChange} type="date" name = "endDate" value={this.props.formData.endDate} />
                            <FormText>Pick date</FormText>
                            {formError.endDate.length>0 && (<ErrorWrapper message={formError.endDate} />) }
                        </Col>
                    </FormGroup>
                    <Button outline color="success">Submit</Button>{' '}
                    <Button outline color="danger">Cancel</Button>{' '}
                </Form>
                }
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    // console.log('formerror',state.inputFormData.formData.formError);     
    return ({
        formData : {...state.inputFormData.formData},
        isLoading : state.todo.isLoading        
    });
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({registerFormError,changeHandler,changeFormField,emptyFormField,showLoader,prePopulateFormField,hideLoader},dispatch);
}

export default connect(mapStateToProp,mapDispatchToProps)(InputForm);