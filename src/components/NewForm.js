import React, { Component, Fragment } from 'react';

// on submit, only grab album id
// pick bg colour and link colour


class NewForm extends Component {
    constructor() {
        super();
        this.state = {
            numSongs: 1,
            userInput: {
                title: '',
                author: '',
                descript: '',
                songList: []
            }
        }
    }

    addSongs = () => {
        let addSongList = [];
        for (let i = 0; i < this.state.numSongs; i++) {
            addSongList.push(
                <Fragment key={i}>
                    <label className="srOnly" htmlFor="inputEmbed">Song Embed Code</label>
                    <input type="text"
                        id="inputEmbed"
                        value={this.state.userInput.songList[i]}
                        name="songList"
                        onChange={this.handleChange}
                        placeholder="Song Embed Code"
                        required />
                </Fragment>
            )
        }
        return addSongList;
    }

    handleChange = (e) => {
        const copyState = { ...this.state.userInput };
        const { name, value } = e.target;
        if (name === "songList") copyState.songList[this.state.numSongs - 1] = value;
        else copyState[name] = value;
        this.setState({
            userInput: copyState
        })
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
        const { title, author, descript, songList } = this.state.userInput;
        return (
            <form className="block newBtn">
                <label className="srOnly" htmlFor="inputTitle">Post Title</label>
                <input type="text"
                    id="postTitle"
                    value={title}
                    name="title"
                    onChange={this.handleChange}
                    placeholder="Post Title"
                    required />

                <label className="srOnly" htmlFor="inputAuthor">Your Name</label>
                <input type="text"
                    id="inputAuthor"
                    value={author}
                    name="author"
                    onChange={this.handleChange}
                    placeholder="Author Name"
                    required />

                <label className="srOnly" htmlFor="inputDescrip">Description</label>
                <textarea rows="7" maxLength="500"
                    id="inputDescrip"
                    value={descript}
                    name="descript"
                    onChange={this.handleChange}
                    placeholder="add a description about your song or album selection. let others konw what kind of mood to expect."
                    required></textarea>

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