import React, { Component } from 'react';
import axios from 'axios';
import { View, Dimensions, Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Content, Button, Text ,
  Left, Body, Right, Icon, Title, Subtitle, List, ListItem,
  Card, CardItem, Spinner } from 'native-base';
import ImageResizer from 'react-native-image-resizer';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs';
import helpers from './helpers';
import CurrentLocation from './components/CurrentLocation';

const ACCESS_TOKEN = "9gMbELAXLHLTE5mghQxHw9KqsNeEvsQmzTNmzFE7DcdELCNEuYuUpyMp4AnhcVr2";

class App extends Component {

  state = {
    error: null,
    latitude: null,
    longitude: null,
    header: 'App',
    showCamera: false,
    imageURI: '',
    rotatedImageURI: '',
    results: [{ plate: 'PLATE1' }, { plate: 'PLATE2' }]
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

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
    axios.post(url, data, config)
      .then(results =>  {
        this.setState({
          results: helpers.processALPRResults(results.data.data.results)
        });
      })
      .catch(err => console.log('error', err));
  }

  onConfirmLicensePlate(plate) {
    this.setState({
      confirmLicenseLoading: plate
    });
    console.log('Calling API with plate ', plate, ' and coordinates lat ', this.state.latitude, ' long ', this.state.longitude);
    setTimeout(() => {
      this.setState({
        confirmLicenseLoading: false
      });
    }, 2000);
  }

  renderResults() {
    if (this.state.results.length > 0) {
      return (

        <Card>
          <CardItem header>
            <Text>We've identified the following license plate(s):</Text>
          </CardItem>

          <List>
            {this.state.results.map(result => {
              return (
                <ListItem key={result.plate}>
                  <CardItem>
                    <Body>
                      <Text>{result.plate}</Text>
                      <Button primary
                              title="Confirm"
                              style={{ marginTop: 10 }}
                              onPress={() => this.onConfirmLicensePlate(result.plate)}
                      >
                        <Text>Confirm</Text>
                        { this.state.confirmLicenseLoading === result.plate
                          ? <Spinner />
                          : null }
                      </Button>
                    </Body>
                  </CardItem>
                </ListItem>
              );
            })}

          </List>

          <CardItem>
            <CurrentLocation/>
          </CardItem>
        </Card>
      );
    }
  }

  rotateImage(path) {
    return new Promise((resolve, reject) => {
      Image.getSize(path, (width, height) => {
        if (width < height) {
          ImageResizer.createResizedImage(path, width, height, 'JPEG', 80, 90).then((response) => {
            const newPath = response.path;
            this.setState({
              rotatedImageURI: response.uri
            });
            resolve(newPath);
          }).catch((err) => {
            reject(err);
          });
        } else {
          resolve(path);
        }
      });
    });
  }

  convertToBase64(path) {
    this.rotateImage(path)
      .then(newPath => {
//        console.log('convertToBase64', newPath);
        RNFS.readFile(newPath, 'base64')
          .then(base64Str => {
            this.extractLicensePlate(base64Str);
          });
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
        <Container>
          <Content>
            <Grid>
              <Row style={{ backgroundColor: '#635DB7', height: 300 }}>
                <Camera
                  ref={(cam) => {
                    this.camera = cam;
                  }}
                  style={styles.preview}
                  captureTarget={Camera.constants.CaptureTarget.disk}
                  aspect={Camera.constants.Aspect.fill}>
                </Camera>
              </Row>
              <Row style={{ backgroundColor: '#eee', height: 30 }}>
                <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                  <Button bordered success onPress={() => this.takePicture()}>
                    <Icon name="ios-camera" />
                    <Text>Capture</Text>
                  </Button>
                  <Button bordered warning onPress={() => this.closeCamera()}>
                    <Icon name="ios-close-circle-outline" />
                    <Text>Cancel</Text>
                  </Button>
                </View>
              </Row>
            </Grid>
          </Content>
        </Container>
      );
    }
  }

  renderImage() {
    if (this.state.imageURI.length > 0) {
      return (
        <Card>
          <CardItem header>
            <Text>Image</Text>
          </CardItem>

          <CardItem cardBody>
            <Image source={{uri: this.state.imageURI, isStatic:true}}
            style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
        </Card>
      );
    }
  }

  renderCTA() {
    if (!this.state.showCamera) {
      return  (
        <Content>
          <Card>
            <CardItem header>
              <Text>Parked in a bike lane?</Text>
            </CardItem>

            <CardItem>
              <Body>
                <Text>
                  Become a bike lance enforcer! Help us by snapping a picture of vehicles parked in bike lanes.
                </Text>
                <Button primary
                        title="Open camera"
                        style={{ marginTop: 10 }}
                        onPress={this.onButtonPress.bind(this)}
                >
                  <Text>Open camera</Text>
                </Button>
              </Body>
            </CardItem>

            <CardItem footer>
              <Text>Thank you!</Text>
            </CardItem>
          </Card>

          {this.renderImage()}

        </Content>
      );
    }
  }

  renderHeader(subtitle) {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Bike Lanes</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Right>
      </Header>
    );
  }

  render() {
    return (
      <Container>
        {this.renderHeader(this.state.header)}
        <Content>
          {this.renderCTA()}
          {this.renderCamera()}
          {this.renderResults()}
        </Content>
      </Container>
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
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').height/2,
  },
  imageRotatedStyle: {
    height: Dimensions.get('window').width/2,
    width: Dimensions.get('window').height/2,
  }
};

export default App;