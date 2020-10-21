import React, { Component } from 'react';
import firebase from './../firebase.js';

class HeartCounter extends Component {
    constructor() {
        super();
        this.state = {
            hearts: 0,
            oldHeart: false
        }
    }

    // check if browser has previous record of likes
    componentDidMount() {
        const heartStorage = JSON.parse(window.localStorage.getItem("heartsLog"));
        if (heartStorage !== null) {
            if (heartStorage[this.props.id]) {
                this.setState({
                    oldHeart: true
                })
            }
        }
        this.setState({
            hearts: this.props.count
        })
    }

    // update like counter on firebase
    handleClick = (id) => {
        // using localStorage to limit number of hearts per computer/user to 1
        let heartStorage = JSON.parse(window.localStorage.getItem("heartsLog"));

        if (heartStorage === null) {
            window.localStorage.setItem("heartsLog", "{}");
            heartStorage = {};
        }

        if (!heartStorage[id]) {
            this.setState(prevState => ({
                hearts: prevState.hearts + 1,
                oldHeart: true
            }), () => {
                const postRef = firebase.database().ref(id + "/header");
                postRef.update({ hearts: this.state.hearts })
            })
            heartStorage[id] = true;
            window.localStorage.setItem("heartsLog", JSON.stringify(heartStorage));
        }
    }

    render() {
        return (
            <div className="heartContainer">
                <p className="counterDisplay" aria-hidden="true">{this.state.hearts}</p>
                <span className="srOnly">{this.state.hearts + " likes"}</span>
                <i
                    className={"fas fa-heart" + (this.state.oldHeart ? " oldHeart" : "")}
                    onClick={() => this.handleClick(this.props.id)}
                    tabIndex={0}
                    aria-label="like this post"
                ></i>
            </div>
        )
    }
}

export default HeartCounter;
