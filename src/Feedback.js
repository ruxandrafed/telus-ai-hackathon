import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Card, CardItem, Icon, Body, Button } from 'native-base';
import FeedbackForm from "./components/FeedbackForm";

export default class Feedback extends Component {
  render() {
    return (
      <Container>
        <Content>

          <Card>
            <CardItem header>
              <Icon name='bicycle' />
              <Text>Send us your feedback</Text>
            </CardItem>

            <CardItem>
              <Body>
                <Text>
                  Have you been using any particular bike lanes and would like to send us some feedback? We'd love to hear it!
                </Text>
                <Text style={{ marginTop: 20 }}>
                  Help us identify opportunities to make biking faster and safer for our city.
                </Text>
              </Body>
            </CardItem>

            <FeedbackForm/>

          </Card>

          <Card>
            <CardItem header>
              <Icon name='bicycle' />
              <Text>Parked in a bike lane?</Text>
            </CardItem>

            <CardItem>
              <Body>
              <Text>
                Become a bike lane enforcer! Help us by snapping a picture of vehicles parked in bike lanes.
              </Text>
              </Body>
            </CardItem>

            <CardItem footer>
              <Button transparent
                      onPress={() => Actions.report()}>
                <Text>Report</Text>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
};