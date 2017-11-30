import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Button, Text ,
  Left, Body, Right, Icon, Title, Subtitle, List, ListItem,
  Card, CardItem, Spinner, Item } from 'native-base';
import AppHeader from './components/AppHeader';
import helpers from './helpers';

class ListPage extends Component {
  state = { loading: true, incidents: [] };

  async componentWillMount() {
    const incidents = await helpers.getIncidents();
    this.setState({
      loading: false,
      incidents
    })
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Bike lane offenders</Text>
            </CardItem>

            { this.state.loading
              ? <Spinner />
              : (
                <CardItem>
                  <Body>
                    <List>
                      {this.state.incidents.map(incident => {
                        return (
                          <ListItem key={incident.id}>
                            <Card key={incident.id}>
                              <CardItem header>
                                <Text>{incident.licencePlate}</Text>
                              </CardItem>
                              <CardItem>
                                <Body>
                                  <Text
                                    style={ { color: helpers.getColor(incident.confidence) } }>
                                    {incident.confidence}% confidence
                                  </Text>
                                  <Text>Date: {helpers.formatDate(incident.timestamp)}</Text>
                                </Body>
                              </CardItem>
                            </Card>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Body>
                </CardItem>
              ) }

            <CardItem footer>
              <Button transparent
                      onPress={() => Actions.map({incidents: this.state.incidents })}
              >
                <Text>See map</Text>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}

export default ListPage;