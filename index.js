import 'react-native-gesture-handler';
import {AppRegistry,LogBox} from 'react-native';
import App from './src/components/App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreAllLogs(true)

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
AppRegistry.registerComponent('main', () => App);
