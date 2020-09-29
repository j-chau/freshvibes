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
        // TODO: try using prevState to avoid Warning
        if (name === "songList") copyState.songList[this.state.numSongs - 1] = value;
        else copyState[name] = value;
        this.setState({
            userInput: copyState
        })
    }

    handleAdd = (e) => {
        e.preventDefault();
        if (this.state.numSongs < 3) {
            const newCount = this.state.numSongs + 1;
            this.setState({
                numSongs: newCount
            })
            // TODO: add error message
        } else console.log("false");
    }

    render() {
        const { title, author, descript } = this.state.userInput;
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

                <div className="bannerImg">
                    <img src="http://placeimg.com/640/640/any" alt="" />
                </div>

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
                    <button onClick={this.handleAdd} className="impBtn">add new song</button>
                </div>
                <div>
                    <button onClick={this.props.closeForm} className="delBtn">delete</button>
                    <button onClick={() => this.props.handleSubmit(this.state.userInput)} className="impBtn">post</button>
                </div>
            </form>
        )
    }
}
export default NewForm;