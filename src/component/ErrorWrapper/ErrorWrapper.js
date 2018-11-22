import React from 'react';
import './ErrorWrapper.css';

const errorWrapper = (props) => {
    return <span className="error"> {props.message} </span>
}

export default errorWrapper;