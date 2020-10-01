import React, { Component, Fragment } from 'react';
import Modal from './Modal.js'

class NewForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            descript: '',
            songListCode: [],
            songList: [],
            banner: {
                imgUrl: ''
            },
            numSongs: 1,
            showImg: false,
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
                        value={this.state.songListCode[i]}
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
        // const copyState = { ...this.state };
        // copyState.banner = { ...selectImg }
        this.setState({
            banner: { ...selectImg },
            // userInput: copyState,
            showImg: false
        })
    }

    closeModal = () => {
        this.setState({
            showImg: false
        })
    }

    handleChange = (e) => {
        const copyState = { ...this.state };
        const { name, value } = e.target;
        // TODO: try using prevState to avoid Warning
        const index = this.state.numSongs - 1;
        if (name === "songList") {
            this.setState({})
        };
        // copyState.songListCode[index] = value;
        // else copyState[name] = value;
        this.setState({
            [name]: value
            // userInput: copyState
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
        e.preventDefault();
        let submit = true;

        const copySongList = [...this.state.songListCode];
        const songListById = copySongList.map(el => {
            if (el !== undefined && el.length > 0) {

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

                if (albumId < 1 || artistLink < 1 || artistCredit < 1) {
                    submit = false;
                    console.log("song id check: failed");
                }
                else {
                    console.log("song id check: pass");
                    return {
                        credit: artistCredit,
                        embedId: albumId,
                        embedLink: artistLink
                    }
                }
            }
        })


        const copyStateValues = Object.values({ ...this.state });
        const errCheck = copyStateValues.filter(el => {
            let check = el;
            if (el.length === undefined) check = Object.values(el);
            return check.length > 0
        });
        console.log(errCheck);
        if (errCheck.length < 5) {
            submit = false;
            console.log("length check: fail");
        }
        // else {
        //     copyStateValues[3].forEach(el => {
        //         if (el.indexOf("bandcamp.com/EmbeddedPlayer") < 0 && el.length > 0) {
        //             submit = false;
        //             return;
        //         }
        //     })
        // }

        console.log("submit:" + submit);
        if (submit) {
            this.setState(prevState => ({
                numSongs: 1,
                // userInput: {
                //     ...prevState.userInput,
                songList: songListById
                // }
            }));
            this.props.handleSubmit(this.state);
        } else this.setState({ error: true });
        console.log(this.state.songList);
    }

    render() {
        const { title, author, descript, banner } = this.state;
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
                    <div>
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