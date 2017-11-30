import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Header, Content, Button, Text ,
  Left, Body, Right, Icon, Title, Subtitle, List, ListItem,
  Card, CardItem, Spinner } from 'native-base';
import AppHeader from './components/AppHeader';

class LandingPage extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Icon name='bicycle' />
              <Text>Parked in a bike lane?</Text>
            </CardItem>

            <CardItem cardBody>
              <Image source={{uri: 'https://images.unsplash.com/photo-1485381771061-e2cbd5317d9c?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}} style={{height: 150, width: null, flex: 1}}/>
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

            <CardItem cardBody>
              <Image source={{uri: 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?auto=format&fit=crop&w=1500&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}} style={{height: 150, width: null, flex: 1}}/>
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