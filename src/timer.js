import React from "react";
let alertSound = require("./HornSound.wav");

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            breakLeft: 5 * 60,
            sessionLeft: 25 * 60,
            isSession: true
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.isReset != this.props.isReset){
            if(this.props.isReset){
                this.handleReset();
            }
        }
        else if(prevProps.sessionLength != this.props.sessionLength || prevProps.breakLength != this.props.breakLength){
            this.handleChange();
        }
        else if(prevProps.isRunning != this.props.isRunning){
            this.handleInterval();
        }
    }

    handleChange(){
        this.setState({
            breakLeft: this.props.breakLength * 60,
            sessionLeft: this.props.sessionLength * 60,
            isSession: true
        });
    }

    handleInterval(){
        clearInterval(this.timeInterval);
        if(this.props.isRunning){
            this.timeInterval = setInterval(()=>{
                this.handleTimeChange();
            }, 1000);
        }
    }

    componentWillUnmount(){
        clearInterval(this.timeInterval);
    }

    handleTimeChange() {
        if(this.state.isSession){
            this.handleSession();
        }
        else{
            this.handleBreak();
        }
    }

    handleSession(){
        if(this.state.sessionLeft){
            this.setState({
                sessionLeft: this.state.sessionLeft - 1
            }, () => {
                this.handleAnimation(this.props.sessionLength * 60, this.state.sessionLeft);
                if(!this.state.sessionLeft){
                    this.handleAudio();
                }
            });
        }
        else{
            this.setState({
                isSession: false
            });
        }
    }

    handleBreak(){
        if(this.state.breakLeft){
            this.setState({
                breakLeft: this.state.breakLeft - 1
            }, () => {
                this.handleAnimation(this.props.breakLength * 60, this.state.breakLeft);
                if(!this.state.breakLeft){
                    this.handleAudio();
                }
            });
        }
        else{
            this.handleChange();
        }
    }

    handleAnimation(length, left){
        let element = document.getElementById("timer-line");
        let animationPercentage = 100 - ((length - left) / length * 100);
        element.style.strokeDashoffset = animationPercentage;
    }

    handleAudio(){
        const audioElement = document.getElementById("beep");
        audioElement.play();
    }

    handleReset(){
        this.props.handleResetState();
        this.handleChange();
        this.handleInterval();
        document.getElementById("timer-line").style.strokeDashoffset = 100;
        
        let audio = document.getElementById("beep");
        audio.pause();
        audio.currentTime = 0;
    }

    toDate(seconds){
        let min = Math.floor(seconds / 60);
        let sec = seconds - min * 60;
        return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    }


    render(){
        return(
            <div id="timer">
                <h2 id="timer-label">{this.state.isSession ? "Session" : "Break"}</h2>
                <div id="time-left">{this.toDate(this.state.isSession ? this.state.sessionLeft : this.state.breakLeft)}</div>
                <svg id="timer-line" viewBox="0 0 33.831 33.831">
                    <path
                        d="M16.9155 1
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <audio id="beep" src={alertSound} type="audio/wav"></audio>
            </div>
        );
    }
}