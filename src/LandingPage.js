import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Button, Text ,
  Left, Body, Right, Icon, Title, Subtitle, List, ListItem,
  Card, CardItem, Spinner } from 'native-base';
import AppHeader from './components/AppHeader';

class LandingPage extends Component {

  render() {
    return (
      <Container>
        <AppHeader title='Welcome' showBackButton={false} />
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
              </Body>
            </CardItem>

            <CardItem footer>
              <Button transparent
                      onPress={() => Actions.report()}
              >
                <Text>Report</Text>
              </Button>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <Text>Looking for the bad guys?</Text>
            </CardItem>

            <CardItem>
              <Body>
              <Text>
                Have a look at the reported offenders.
              </Text>
              </Body>
            </CardItem>

            <CardItem footer>
              <Button transparent
                      onPress={() => Actions.list()}
              >
                <Text>List offenders</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default LandingPage;