import React, { Component } from 'react';
import axios from 'axios';
import { View, Button, Dimensions, Text, Image } from 'react-native';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import { Header } from './components/common';

const ACCESS_TOKEN = "9gMbELAXLHLTE5mghQxHw9KqsNeEvsQmzTNmzFE7DcdELCNEuYuUpyMp4AnhcVr2";

class App extends Component {
  state = {
    showCamera: false,
    imageURI: ''
  };

  onButtonPress() {
    this.setState( { showCamera: true });
  }

  extractLicensePlate(base64String) {
    const url = 'https://hack2017.mbenablers.com/bikes/alpr';
    const data = {
      token: ACCESS_TOKEN,
      image: base64String.toString(),
      code: "us",
      state: "on"
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log('POTATO', base64String);
//    axios.post(url, data, config)
//      .then(results =>  {
//        console.log('results', results);
//
//      })
//      .catch(err => console.log('error', err));
  }

  convertToBase64(path) {
    RNFS.readFile(path, 'base64')
      .then(base64Str => {
        this.extractLicensePlate(base64Str);
      });
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        this.setState( {
          showCamera: false,
          imageURI: data.path
        });
        this.convertToBase64(data.path);
      })
      .catch(err => console.error(err));
//    console.log('this.camera', this.camera);
  }

  closeCamera() {
    this.setState( {
      showCamera: false
    })
  }

  renderCamera() {
    if (this.state.showCamera) {
      return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          <Text style={styles.closeCamera} onPress={this.closeCamera.bind(this)}>[CANCEL]</Text>
        </Camera>
      );
    }
  }

  renderImage() {
    if (this.state.imageURI.length > 0) {
      return (
        <Image
          source={{uri: this.state.imageURI, isStatic:true}}
          style={styles.imageStyle}
        />
      );
    }
  }

  renderCTA() {
    if (!this.state.showCamera) {
      return  (
        <View>
          <Button
            title="Open camera"
            onPress={this.onButtonPress.bind(this)}
          >
            Open camera
          </Button>
          {this.renderImage()}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.appContainerStyle}>
        <Header headerText="Bike Parking Patrol" />
        {this.renderCTA()}
        {this.renderCamera()}
      </View>
    );
  }
}

const styles = {
  appContainerStyle: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column'
  },
  viewSpinnerStyle: {
    marginTop: 30,
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 20
  },
  closeCamera: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 5
  },
  imageStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
};

export default App;