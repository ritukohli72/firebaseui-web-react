/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuth } from 'react-firebaseui';
import styles from './app.css'; // This uses CSS modules.
import './firebaseui-styling.global.css'; // Import globally.

// Get the Firebase config from the auto generated file.
const firebaseConfig = require('./firebase-config.json').result;

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp(firebaseConfig);

/**
 * The Splash Page containing the login UI.
 */
export default class App extends React.Component {

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {
        this.setState({signedIn: true});
        return false;
      }
    }
  };

  state = {
    signedIn: false
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logo}><i className={styles.logoIcon + ' material-icons'}>photo</i> My App</div>
        <div className={styles.caption}>This is a cool demo app</div>
        {!this.state.signedIn &&
          <div>
            <FirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig} firebaseAuth={firebaseApp.auth()}/>
          </div>
        }
        {this.state.signedIn &&
        <div>
          You are now signed In!
        </div>
        }
      </div>
    )
  }
}
