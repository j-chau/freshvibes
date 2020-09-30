import './App.css';
import './Modal.css'

import React, { Component } from 'react';
import firebase from './firebase.js';

import Post from './components/Posts.js';
import NewForm from './components/NewForm.js';
import Modal from './components/Modal.js';

// click for new post:
//  x new post form expands from button -> form component
//    o add transitions
//  x onClick newButton trigger function to intake user data
//  o Unsplash API call made when title loses focus after text input
//  o use 'novalidate' and 'required' to set required fields with custom error messages
//  x onClick delete: clear form and close form
//  x onClick post: add date and time to data, push user data to firebase
// likeCounter: 
//  x increment on click
//  x push value to firebase
//  x use localStorage to lock one like per user



class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      showNew: true,
      showImg: false
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
      this.setState({
        posts: newState
      })
    });
  }

  savePost = (userInput) => {
    const { title, author, descript, songList } = userInput;
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
      songList: []
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
    this.setState({
      showNew: false
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.showImg && (
          <>
            <div className="modalBg"></div>
            <Modal />
          </>
        )}
        < h1 className="block">fresh vibes</h1>
        {!this.state.showNew
          ? <button className="block newBtn" onClick={() => this.setState({ showNew: true })}>+ New</button>
          : <NewForm
            closeForm={() => this.setState({ showNew: false })}
            showModal={() => this.setState({ showImg: true })}
            handleSubmit={this.savePost}
          />}
        {this.state.posts.map(el => {
          const { description, header, songList } = el.content;
          return (
            <Post
              key={el.key}
              id={el.key}
              header={header}
              description={description}
              songList={songList}
            />
          )
        })}

      </div>
    );
  }
}

export default App;
