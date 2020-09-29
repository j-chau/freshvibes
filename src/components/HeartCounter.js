import React, { Component } from 'react';
import firebase from './../firebase.js';

class HeartCounter extends Component {
    constructor() {
        super();
        this.state = {
            hearts: 0
        }
    }

    componentDidMount() {
        this.setState({
            hearts: this.props.count
        })
    }

    handleClick = (id) => {
        this.setState(prevState => ({
            hearts: prevState.hearts + 1
        }), () => {
            const postRef = firebase.database().ref(id + "/header");
            postRef.update({ hearts: this.state.hearts })
        })
    }
    render() {
        return (
            <div className="heartContainer">
                <p className="counterDisplay">{this.state.hearts}</p>
                <i className="fas fa-heart" onClick={() => this.handleClick(this.props.id)}></i>
            </div>
        )
    }
}

export default HeartCounter;
