import './App.css';
import './Modal.css'

import React, { Component } from 'react';
import firebase from './firebase.js';

import Post from './components/Posts.js';
import NewForm from './components/NewForm.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      showNew: false,
      touchscreen: false
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", res => {
      const newState = [];
      const data = res.val();
      for (let el in data) {
        newState.unshift({
          key: el,
          content: data[el]
        })
      }
      this.setState({ posts: newState })
    });

    // checks if device is using touchscreen (no access to bandcamp's embed codes when using bandcamp.com on touch enabled/mobile devices)
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) this.setState({ touchscreen: true })
  }

  savePost = (userInput) => {
    const { title, author, descript, songList, banner } = userInput;
    const currentDate = new Date();
    const publishDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`
    let firebaseArr = {
      header: {
        author,
        title,
        publishInfo: publishDate,
        hearts: 0
      },
      description: descript,
      songList: [],
      banner
    }

    const copySongList = [...songList];
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
    this.setState({ showNew: false })
  }

  render() {
    return (
      <div className="App">
        <h1 className="block">fresh vibes</h1>

        {this.state.touchscreen ? "" :
          !this.state.showNew
            ? <button className="block newBtn" onClick={() => this.setState({ showNew: true })}>+ New</button>
            : <NewForm
              closeForm={() => this.setState({ showNew: false })}
              handleSubmit={this.savePost}
            />}

        {this.state.posts.map(el => {
          const { header, description, songList, banner } = el.content;
          return (
            <Post
              key={el.key}
              id={el.key}
              header={header}
              description={description}
              songList={songList}
              banner={banner}
            />
          )
        })}

      </div>
    );
  }
}

export default App;
