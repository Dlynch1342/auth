import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Router, Scene } from 'react-native-router-flux';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import Chat from './components/Chat';


class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyD-DEfQ56wW4LBA5brsBn8pq-zh8SYegUk",
            authDomain: "auth-44c5b.firebaseapp.com",
            databaseURL: "https://auth-44c5b.firebaseio.com",
            projectId: "auth-44c5b",
            storageBucket: "auth-44c5b.appspot.com",
            messagingSenderId: "16386201723"
          });
    }


    componentWillMount() {
        this.renderNumOfUsers();
    }
    
    renderNumOfUsers() {
        const uid = firebase.auth().currentUser.uid;
        const userStatusDatabaseRef = firebase.database().ref(`messages/${uid}/user/${_id}/status`);
        const isOfflineForDatabase = {
            state: 'offline'
        };
        const isOnlineForDatabase = {
            state: 'online'
        };
        firebase.database().ref('.info/connected').on('value', (snapshot) => {
            if (snapshot.val() === false) {
                return;
            }
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
            userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
    
    //     const usersCount = firebase.database().ref(`users/${uid}/presence`);
    //     usersCount.on('value', (snapshot) => {
    //         console.log(snapshot.val());
    //         let count = 0;
    //         if (snapshot.val() === 'online') {
    //             console.log('hitting');
    //             count++;
    //             this.setState({ totalCount: count });
    //         }   
    //     });
    // }
    
    
    render() {
        return (
            <View>
                <Text>  
                    {this.state.totalCount}                  
                </Text>
            </View>
        );
    }

    render() {
        return (
            <Router>
                <Scene key='root' hideNavBar>
                    <Scene key='auth' initial>
                        <Scene key='login' component={LoginForm} title="Login"/>
                    </Scene>
                    <Scene key='main'>
                        <Scene key='chat' component={Chat} title="Chat"/>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default App;