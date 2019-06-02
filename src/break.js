import React from "react";

export default function Break(props) {
    function handleIncrement() {
        props.handleChange(1);
    }
    function handleDecrement() {
        props.handleChange(-1);
    }
    return (
        <div id="break">
            <h2 id="break-label" className="label">Break Length</h2>
            <i id="break-decrement" className="fas fa-minus decrement" onClick={handleDecrement}></i>
            <div id="break-length" className="length">{props.value}</div>
            <i id="break-increment" className="fas fa-plus increment" onClick={handleIncrement}></i>
        </div>
    );
}   