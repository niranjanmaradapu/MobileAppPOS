// import { AppRegistry } from 'react-native';
// import App from './App';
// AppRegistry.registerComponent('Logsin', () => App);

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import { registerRootComponent } from 'expo';
import App from './src/components/App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For requests
axios.interceptors.request.use(
    (req) => {
       const token =  AsyncStorage.getItem("tokenkey").then ((value) => {
        console.log( value)
    }).catch(() => {
        console.log('there is error getting token')
    })
       req.headers.Authorization = 'Bearer' + ' ' + token;
       console.log("Request to server::::::::::::::::::: + req.headers.Authorization");
       return req;
    },
    (err) => {
       return Promise.reject(err);
    }
 );

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent('main', () => App);
