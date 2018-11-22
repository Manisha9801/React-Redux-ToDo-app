import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import todoReducer from './reducers/reducer';
import formReducer from './reducers/FormReducer/formReducer';


const store = createStore(combineReducers({
    todo: todoReducer,
    inputFormData : formReducer
}),{}, applyMiddleware(thunk))

// import {createStore} from 'redux';
// import formReducer from './store/reducers/formReducer';
// import { Provider } from 'react-redux';

// const store = createStore(formReducer);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();