import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import axios from 'axios';
import { Spinner, Container, Header, Content, Form, Item, Input, Label, Text, Card, CardItem, Icon, Body, Button, Picker } from 'native-base';

const ACCESS_TOKEN = "9gMbELAXLHLTE5mghQxHw9KqsNeEvsQmzTNmzFE7DcdELCNEuYuUpyMp4AnhcVr2";

class FeedbackForm extends Component {
  state = {
    feedback: '',
    error: '',
    loading: false,
    bikeLane: null,
    score: 0,
    sentimentIcon: 'ios-ionitron-outline'
  }

  doSentimentAnalysis(text) {
    const url = 'https://hack2017.mbenablers.com/bikes/sentiment';
    const data = {
      token: ACCESS_TOKEN,
      document: {
        content: text
      }
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return new Promise((resolve, reject) => {
      axios.post(url, data, config)
        .then(result =>  {
          resolve(result.data.data.documentSentiment.score);
        })
        .catch(err => {
          console.log('error', err);
          reject(err);
        });
    });
  }

  onButtonPress() {
    const { feedback } = this.state;
    this.setState({ error: '', loading: true });

    this.doSentimentAnalysis(feedback)
      .then((result) => {
        let iconClass;

        if (result > 0.9) {
          iconClass = 'ios-heart';
        } else if (result > 0.5) {
          iconClass = 'ios-happy';
        } else if (result > 0) {
          iconClass = 'ios-ionitron';
        } else if (result > -0.5) {
          iconClass = 'ios-sad';
        } else {
          iconClass = 'ios-flame';
        }

        this.setState({
          error: '',
          loading: false,
          score: result,
          sentimentIcon: iconClass
        });
      });
  }

  onSuccess() {
    this.setState({
      error: '',
      loading: false,
      feedback: ''
    });
  }

  onFailure() {
    this.setState({ error: 'Failed.', loading: false });
  }

  getIconStyle(prevThreshold, threshold) {
    if (this.state.score > threshold && this.state.score < prevThreshold) {
      return {
        color: 'green',
        fontSize: 65,
        paddingLeft: 5
      }
    }
    return {
      color: '#ddd',
      fontSize: 65,
      paddingLeft: 5
    }
  }

  renderButton() {
    if (this.state.loading) {
      return (<Spinner size="small" />);
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)} style={{ marginRight: 10, marginLeft: 10 }}>
        <Text>Send</Text>
      </Button>
    )
  }

  render() {
    return (
      <Container>
        <Content>

          <Picker
            placeholder="Choose a bike lane"
            selectedValue={this.state.bikeLane}
            onValueChange={(itemValue, itemIndex) => this.setState({bikeLane: itemValue})}>
            <Picker.Item label="Adanac St" value="adanac" />
            <Picker.Item label="Howe St" value="howe" />
            <Picker.Item label="Davie St" value="davie" />
            <Picker.Item label="Richards St" value="richards" />
            <Picker.Item label="Pender St" value="pender" />
          </Picker>

          <TextInput
            style={{height: 120, borderColor: 'gray', borderWidth: 1, marginRight: 10, marginLeft: 10}}
            onChangeText={(feedback) => this.setState({feedback})}
            value={this.state.feedback}
            multiline={true}
          />

          {this.renderButton()}

          <Text style={ { fontSize: 65, marginLeft: 10, marginBottom: 30 } }>
            <Icon name='ios-flame' style={this.getIconStyle(-0.5, -1)} />
            <Text> </Text>
            <Icon name='ios-sad' style={this.getIconStyle(-0, -0.5)} />
            <Text> </Text>
            <Icon name='ios-ionitron' style={this.getIconStyle(0.5, 0)} />
            <Text> </Text>
            <Icon name='ios-happy' style={this.getIconStyle(0.9, 0.5)} />
            <Text> </Text>
            <Icon name='ios-heart' style={this.getIconStyle(1, 0.9)} />
          </Text>

        </Content>

      </Container>
    )
  }
}

export default FeedbackForm;