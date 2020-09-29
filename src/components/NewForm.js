import React, { Component, Fragment } from 'react';
import firebase from './../firebase.js'

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

    handleSubmit = (props) => {
        const { author, title, descript } = this.state.userInput;
        const currentDate = new Date();
        const publishDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`
        let firebaseArr = {
            header: {
                author: author,
                title: title,
                publishInfo: publishDate
            },
            description: descript,
            songList: []
        }

        const copySongList = [...this.state.userInput.songList];
        for (let i = 0; i < copySongList.length; i++) {
            const el = copySongList[i]

            // get album id
            const albumIdStart = el.indexOf("album") + "album".length + 1;
            const albumIdEnd = el.indexOf("/", albumIdStart);
            const albumId = el.slice(albumIdStart, albumIdEnd);

            // get artist link
            const linkStart = el.indexOf("<a href") + "<a href".length + 2;
            const linkEnd = el.indexOf("\">", linkStart);
            const artistLink = el.slice(linkStart, linkEnd);

            // get artist credit
            const creditEnd = el.indexOf("</a>", linkEnd);
            const artistCredit = el.slice(linkEnd + 2, creditEnd);

            firebaseArr.songList.push({
                credit: artistCredit,
                embedId: albumId,
                embedLink: artistLink
            })
        }
        const dbRef = firebase.database().ref();
        dbRef.push(firebaseArr);
        props.action();
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
                    <button onClick={this.props.action}>delete</button>
                    <button onClick={() => this.handleSubmit(this.props)} className="impBtn">post</button>
                </div>
            </form>
        )
    }
}
export default NewForm;