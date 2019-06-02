import React from "react";

export default function Session(props) {
    function handleIncrement() {
        props.handleChange(1);
    }
    function handleDecrement() {
        props.handleChange(-1);
    }
    return (
        <div id="session">
            <h2 id="session-label" className="label">Session Length</h2>
            <i id="session-decrement" className="fas fa-minus decrement" onClick={handleDecrement}></i>
            <div id="session-length" className="length">{props.value}</div>
            <i id="session-increment" className="fas fa-plus increment" onClick={handleIncrement}></i>
        </div>
    );
}   