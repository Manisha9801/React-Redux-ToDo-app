import React from 'react';
import { withRouter } from 'react-router';

const taskRow = (props) => {
    return(
        <tr>
            <td>{props.sNo}</td>
            <td>{props.data.taskName}</td>
            <td>{props.data.taskDetails}</td>
            <td>{props.data.startDate}</td>
            <td>{props.data.endDate}</td> 
            <td><button onClick={()=>props.history.replace(`/edit-task/${props.id}`)} >EDIT</button></td>           
            <td><button onClick={props.deleteTask}>DELETE</button></td>
        </tr>
    );
}

export default withRouter(taskRow);