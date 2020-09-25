import React, { Component } from 'react';
import firebase from './firebase.js';

import './App.css';

// click for new post:
//  o new post form expands from button -> form component
//  o onClick newButton trigger function to intake user data
//  o Unsplash API call made when title loses focus after text input
//  o use 'novalidate' and 'required' to set required fields with custom error messages
//  o onClick delete: clear form and close form
//  o onClick post: add date and time to data, push user data to firebase
// likeCounter: increment on click, push value to firebase



class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>fresh vibes</h1>
      </div>
    );
  }
}

export default App;
