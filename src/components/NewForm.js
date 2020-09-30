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
                banner: {}
            },
            error: false
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
        // TODO: preventDefault not working?
        e.preventDefault();
        if (this.state.numSongs < 3) {
            const newCount = this.state.numSongs + 1;
            this.setState({
                numSongs: newCount
            })
            // TODO: add error message
        } else console.log("false");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const copyStateValues = Object.values({ ...this.state.userInput });
        const errCheck = copyStateValues.filter(el => {
            let check = el;
            if (el.length === undefined) check = Object.values(el);
            return check.length > 0
        });
        if (errCheck.length !== 5) this.setState({ error: true });
        else {
            console.log("completed form");
            this.setState({ numSongs: 1 });
            this.props.handleSubmit(this.state.userInput);
        }
    }

    render() {
        const { title, author, descript, banner } = this.state.userInput;
        return (
            <>
                {this.state.showImg && (
                    <>
                        <div className="modalBg"></div>
                        <Modal handleSelect={this.addImg} />
                    </>
                )}
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

                    <div className="bannerImg noImg" onClick={() => this.setState({ showImg: true })} tabIndex={0}>
                        {Object.keys(banner).length > 0
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
                        <button onClick={this.handleAdd} className="impBtn addSongBtn">add new song</button>
                    </div>
                    <div className="btnContainer">
                        <button onClick={this.props.closeForm} className="delBtn">delete</button>
                        <button type="submit" onClick={this.handleSubmit} className="impBtn">post</button>
                        <p className={"errMsg" + (!this.state.error ? "" : " show")}>all fields are required</p>
                    </div>
                </form>
            </>
        )
    }
}
export default NewForm;