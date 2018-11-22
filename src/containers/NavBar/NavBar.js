import React , { Component } from 'react';
import {Route, NavLink , Switch} from 'react-router-dom'

import InputForm from './../../component/Forms/InputForm';
import TaskList from './../TaskList/TaskList';

class NavBar extends Component {
   
    render() {
        return(
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink  to="/feed-task">Enter task</NavLink></li>
                            <li><NavLink to="/task-list" >List</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route exact path="/edit-task/:id" component={InputForm} />
                    <Route path="/feed-task" component={InputForm} />
                    <Route path="/task-list" component={TaskList} />
                    {/* <Route path="/task-list" render = {() => <p>Manisha Kumari</p>} /> */}
                </Switch>
            </div>
        );
    }
}

export default NavBar;