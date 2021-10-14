import React from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './CaptureButton.js'
import Amplify, {API} from 'aws-amplify';

 
// Amplify configuration for API-Gateway
Amplify.configure({
 API: {
   endpoints: [
     {
       name: 'LabellingAPI',   //your api name
       endpoint:'', //Your Endpoint URL
     },
   ],
 },
});

export default class ImageScanner extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            identifedAs: '',
            loading: false
        }
    }
    takePicture = async function(){
        if (this.camera) {
            // Pause the camera's preview
            this.camera.pausePreview();
            // Set the activity indicator
            this.setState((previousState, props) => ({
                loading: true
            }));
            // Set options
            const options = {
                base64: true
            };
            this.setState({
                capturedImage: response.uri,
              });
            // Get the base64 version of the image
            const data = await this.camera.takePictureAsync(options)
            // Get the identified image
            this.identifyImage(data.base64);
        }
    }
    identifyImage(imageData){
        Alert.alert(
            'object name is' +  imageData
         )
            const apiName = 'LabellingAPI';
            const path = '/storeimage';
            const init = {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-amz-json-1.1',
              },
              body: JSON.stringify({
                Image:imageData,
                name: 'storeImage.png',
              }),
            };
        
            API.post(apiName, path, init).then(response => {
              if (JSON.stringify(response.Labels.length) > 0) {
                this.setState({
                  objectName: response.Labels[0].Name,
                });
                 // Dismiss the acitivty indicator
               this.setState({loading:false});
    // Show an alert wit loading:falseh the answer on
    Alert.alert(
           'object name is' +  objectName
        )
        // Resume the preview
        this.camera.resumePreview();
              } else {
                alert('Please Try Again.');
              }
            });
          }


       
    displayAnswer(identifiedImage){
       
    }
    render() {
        return (
            <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
            <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading}/>
            <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)}/>
            </RNCamera>
        );
    }
}
const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    loadingIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});




