import React, { Component, Fragment } from 'react';

// on submit, only grab album id
// pick bg colour and link colour


class NewForm extends Component {
    constructor() {
        super();
        this.state = {
            numSongs: 1
        }
    }

    addSongs = () => {
        let addSongList = [];
        for (let i = 0; i < this.state.numSongs; i++) {
            addSongList.push(
                <Fragment key={i}>
                    <label className="srOnly" htmlFor="inputEmbed">Song Embed Code</label>
                    <input type="text" id="inputEmbed" placeholder="Song Embed Code" required />
                </Fragment>
            )
        }
        return addSongList;
    }

    handleClick = (e) => {
        e.preventDefault();
        if (this.state.numSongs < 3) {
            console.log("true");
            const newCount = this.state.numSongs + 1;
            this.setState({
                numSongs: newCount
            })
        } else console.log("false");
        console.log("handleClick triggered => this.state.numSongs: " + this.state.numSongs);
    }

    render() {
        console.log("rendered");
        return (
            <form className="block newBtn">
                <label className="srOnly" htmlFor="inputTitle">Post Title</label>
                <input type="text" id="postTitle" placeholder="Post Title" required />

                <label className="srOnly" htmlFor="inputAuthor">Your Name</label>
                <input type="text" id="inputAuthor" placeholder="Author Name" required />

                <label className="srOnly" htmlFor="inputDescrip">Description</label>
                <textarea id="inputDescrip" rows="7" maxLength="500" placeholder="add a description about your song or album selection. let others konw what kind of mood to expect." required></textarea>

                {this.addSongs()}

                <div className="btnContainer">
                    <button onClick={this.handleClick} className="impBtn">add new song</button>
                </div>
                <div>
                    <button onClick={this.handleDelete}>delete</button>
                    <button onClick={this.handleSubmit} className="impBtn">post</button>
                </div>
            </form>
        )
    }
}
export default NewForm;