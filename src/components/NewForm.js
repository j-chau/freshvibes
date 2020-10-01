import React, { Component, Fragment } from 'react';
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
                songList: [],
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

    addImg = (e, selectImg) => {
        e.preventDefault();
        const copyState = { ...this.state.userInput };
        copyState.banner = { ...selectImg }
        this.setState({
            userInput: copyState,
            showImg: false
        })
    }

    closeModal = () => {
        this.setState({
            showImg: false
        })
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
        }
    }

    handleSubmit = (e) => {
        let errMsg = "";
        e.preventDefault();
        const copyStateValues = Object.values({ ...this.state.userInput });
        const errCheck = copyStateValues.filter(el => {
            let check = el;
            if (el.length === undefined) check = Object.values(el);
            return check.length > 0
        });
        if (errCheck.length !== 5) errMsg = "all fields are required";
        else {
            copyStateValues[3].forEach(el => {
                if (el.indexOf("bandcamp.com/EmbeddedPlayer") < 0 && el.length > 0) {
                    errMsg = "please use the embed code from bandcamp";
                }
            })
        }
        if (errMsg.length === 0) {
            console.log("completed form");
            this.props.handleSubmit(this.state.userInput);
        } else this.setState({
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

                    {this.addSongs()}

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