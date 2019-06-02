import React from "react";

export default function StartStop(props){
    return <a id="start_stop" onClick={props.handleRunning}>{props.isRunning ? "STOP" : "START"}</a>
}