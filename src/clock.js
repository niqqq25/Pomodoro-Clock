import React from "react";
import Break from "./break.js";
import Session from "./session.js";
import Timer from "./timer.js";
import StartStop from "./start_stop_button.js";
import Reset from "./reset_button.js";

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isRunning: false,
            isReset: false,
            breakLength: 5,
            sessionLength: 25
        }
        this.handleRunning = this.handleRunning.bind(this);
        this.handleBreakChange = this.handleBreakChange.bind(this);
        this.handleSessionChange = this.handleSessionChange.bind(this);
        this.handleDefault = this.handleDefault.bind(this);
        this.handleResetState = this.handleResetState.bind(this);
    }
    handleRunning(){
        this.setState({
            isRunning: !this.state.isRunning
        });
    }
    handleBreakChange(increment){
        if(!this.state.isRunning && this.state.breakLength + increment <= 60 && this.state.breakLength + increment > 0){
            this.setState({
                breakLength: this.state.breakLength + increment
            });
        }
    }
    handleSessionChange(increment){
        if(!this.state.isRunning && this.state.sessionLength + increment <= 60 && this.state.sessionLength + increment > 0){
            this.setState({
                sessionLength: this.state.sessionLength + increment
            });
        }
    }
    handleDefault(){
        this.setState({
            isRunning: false,
            isReset: true,
            breakLength: 5,
            sessionLength: 25
        });
    }
    handleResetState(){
        this.setState({
            isReset: !this.state.isReset
        });
    }
    render(){
        return (
            <div id="clock">
                <header id="header">
                    <Session handleChange={this.handleSessionChange} value={this.state.sessionLength}/>
                    <div id="start-stop-reset-wrapper">
                        <StartStop isRunning={this.state.isRunning} handleRunning={this.handleRunning}/>
                        <Reset handleChange={this.handleDefault}/>
                    </div>
                    <Break handleChange={this.handleBreakChange} value={this.state.breakLength}/>
                </header>
                <Timer 
                    breakLength={this.state.breakLength}
                    sessionLength={this.state.sessionLength}
                    isRunning={this.state.isRunning}
                    isReset={this.state.isReset}
                    handleResetState={this.handleResetState}
                />
            </div>
        );
    }
}