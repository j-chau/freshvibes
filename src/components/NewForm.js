import React, { Component } from 'react';
import Modal from './Modal.js'

class NewForm extends Component {
    constructor() {
        super();
        this.state = {
            numSongs: 1,
            showImg: false,
            userInput: {
                title: '',
                author: '',
                descript: '',
                songList: [''],
                banner: {
                    imgUrl: ''
                }
            },
            error: {
                isError: false,
                errorMsg: ''
            },
        }
    }

    // create input fields for adding embed codes
    addSongs = () => {
        const { songList } = this.state.userInput;
        let addSongList = [];
        for (let i = 0; i < songList.length; i++) {
            addSongList.push(
                <li key={i}>
                    <label className="srOnly" htmlFor={"inputEmbed" + i}>Song Embed Code</label>
                    <input type="text"
                        id={"inputEmbed" + i}
                        value={songList[i]}
                        name="songList"
                        onChange={this.handleChange}
                        placeholder="Song Embed Code"
                        className="songInput"
                        required />
                </li>
            )
        }
        return addSongList;
    }

    // save selected banner img to state
    addImg = (e, selectImg) => {
        e.preventDefault();
        const copyState = { ...this.state.userInput };
        copyState.banner = { ...selectImg }
        this.setState({
            userInput: copyState,
            showImg: false
        })
    }

    closeModal = () => this.setState({ showImg: false });

    // save text from input fields to state
    handleChange = (e) => {
        const copyState = { ...this.state.userInput };
        const { name, value, id } = e.target;
        const index = id.slice(-1);
        if (name === "songList") {
            copyState.songList[index] = value;
        }
        else copyState[name] = value;
        this.setState({
            userInput: copyState
        })
    }

    // trigger creating new input field for embed code (max. of 3)
    handleAdd = (e) => {
        e.preventDefault();
        if (this.state.numSongs < 3) {
            let copySongList = [...this.state.userInput.songList];
            copySongList.push("");
            const newCount = this.state.numSongs + 1;
            this.setState(prevState => ({
                numSongs: newCount,
                userInput: {
                    ...prevState.userInput,
                    songList: copySongList
                }
            }), () => this.addSongs())
        }
    }

    handleSubmit = (e) => {
        let errMsg = "";
        e.preventDefault();

        // check to see if all input fields have been completed
        const copyStateValues = Object.values({ ...this.state.userInput });
        const errCheck = copyStateValues.filter(el => {
            let check = el;
            if (el.length === undefined) check = Object.values(el);
            return check.length > 0
        });
        if (errCheck.length !== 5) errMsg = "all fields are required";

        // check if embed code is from bandcamp
        else {
            copyStateValues[3].forEach(el => {
                if (el.indexOf("bandcamp.com/EmbeddedPlayer") < 0 && el.length > 0) {
                    errMsg = "please use the embed code from bandcamp";
                }
            })
        }

        if (errMsg.length === 0) this.props.handleSubmit(this.state.userInput);
        else this.setState({
            error: {
                isError: true,
                errorMsg: errMsg
            }
        });

    }

    render() {
        const { title, author, descript, banner } = this.state.userInput;
        const offBtn = this.state.numSongs < 3 ? false : true;
        return (
            <>
                {this.state.showImg && (
                    <>
                        <div className="modalBg"></div>
                        <Modal handleSelect={this.addImg} closeModal={this.closeModal} />
                    </>
                )}
                <form className="block newBtn form">
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

                    <div
                        className={"bannerImg" + (banner.imgUrl.length < 1 ? " noImg" : "")}
                        onClick={() => this.setState({ showImg: true })}
                        tabIndex={0}>
                        {banner.imgUrl.length > 1
                            ? <img src={banner.imgUrl} alt={banner.altText} />
                            : <p>Click to select an image</p>
                        }
                    </div>

                    <label className="srOnly" htmlFor="inputDescrip">Description</label>
                    <textarea rows="7" maxLength="500"
                        id="inputDescrip"
                        value={descript}
                        name="descript"
                        onChange={this.handleChange}
                        placeholder="add a description about your song or album selection. let others konw what kind of mood to expect."
                        required></textarea>

                    <ul>
                        {this.addSongs()}
                    </ul>

                    <div>
                        <button
                            onClick={this.handleAdd} className="impBtn addSongBtn" disabled={offBtn} aria-disabled={offBtn}>add new song</button>
                    </div>
                    <div className="btnContainer">
                        <button onClick={this.props.closeForm} className="delBtn">delete</button>
                        <button type="submit" onClick={this.handleSubmit} className="impBtn">post</button>
                        <p className={"errMsg" + (!this.state.error.isError ? "" : " show")}>{this.state.error.errorMsg}</p>
                    </div>
                </form>
            </>
        )
    }
}
export default NewForm;