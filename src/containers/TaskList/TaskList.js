import React,{Component} from 'react';
import { Table } from 'reactstrap';
// import axios from './../../axios';

import Aux from '../../hoc/AuxComp';
import './TaskList.css';
import TaskRow from './TaskRow/TaskRow';
import Spinner from './../../component/UI/Spinner/Spinner';

import {GetList,deleteTask} from './../../actions/actions'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading : false,
            taskList : []
        }
    }

    // getList= ()=>{
        // let taskList;
        /** when not using mapdispatchtoprops*/

        // const {dispatch}= this.props;
        // dispatch(GetList());
        
        /** when using mapdispatchtoprops*/
        //this.props.getListFromServer();
        
        /** when using bindactioncreators*/
        // this.props.GetList();

        // axios.get('/tasks.json')
        // .then(response => {
        //     if(response.data === null) {
        //         taskList = null;
        //     }
        //     else {
        //         taskList =    
        //         Object.keys(response.data).map((keyId,key) => {
        //             // return <TaskRow key={key} id={keys} sNo={key+1} taskName={temp.taskName} taskDetails={temp.taskDetails} startDate={temp.startDate} endDate={temp.endDate}/>
        //             return <TaskRow id={keyId} key={key} sNo={key+1} data={response.data[keyId]} deleteTask={() => this.deleteTask(keyId)} />
        //         });
        //     }
        //     this.setState({taskList : taskList});
        //     this.setState({isLoading : false});
        // }); 
    // }
    
    componentDidMount() {
        this.props.GetList();
    }
    
    // deleteEntry = (taskId) => {
        // this.props.deleteTask(taskId)
        // this.setState({isLoading : true});
        // axios.delete('/tasks/' + `${taskId}.json`)
        // .then((response) => {
        //     this.getList();
        // }).catch(error => alert(error));
    // }   
    
    createRow=()=>{
        const taskList = Object.keys(this.props.taskList).map((keyId,key) => {
            // return <TaskRow key={key} id={keys} sNo={key+1} taskName={temp.taskName} taskDetails={temp.taskDetails} startDate={temp.startDate} endDate={temp.endDate}/>
            return <TaskRow id={keyId} key={key} sNo={key+1} data={this.props.taskList[keyId]} deleteTask={() => this.props.deleteTask(keyId)} />
        });
        return taskList;
    }

    render() {

        // console.log("this.props :: ",this.props.GetList.toString());
        return(
            <Aux>
                {this.props.isLoading ? <Spinner  /> :
                (this.props.taskList ? 
                <Table className="task-list" bordered>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>TASK NAME</th>
                            <th>TASK DETAILS</th>
                            <th>START DATE</th>
                            <th>END DATE</th>  
                            <th>ACTION</th> 
                            <th>ACTION</th>                         
                        </tr>
                    </thead>
                    <tbody>
                        {this.createRow()}
                    </tbody>
                </Table>
                : <div>No data to display.... Enter your routine in form to maintain track!!!!!!!!!!!!!!!!!</div> )
                }
            </Aux>
        );
    }
}

const mapStateToProps = state=>{
    return {
        taskList: state.todo.list,
        isLoading : state.todo.isLoading
    }
}

const mapPropsToDispatch = dispatch=>{
    return bindActionCreators({GetList,deleteTask}, dispatch)
}


export default connect(mapStateToProps,mapPropsToDispatch)(TaskList);