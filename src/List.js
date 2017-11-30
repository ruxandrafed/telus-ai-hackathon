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

  formatDate(timestamp) {
   const date = new Date(timestamp);
   return date.toLocaleDateString();
  }

  render() {
    return (
      <Container>
        <AppHeader title='Offenders' showBackButton={false} />
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
                        console.log('INCIDENT', incident);
                        return (
                          <ListItem key={incident.id}>
                            <Card key={incident.id}>
                              <CardItem header>
                                <Text>Offender: {incident.licencePlate}</Text>
                              </CardItem>
                              <CardItem>
                                <Body>
                                <Text>
                                  Confidence Score: {incident.confidence}
                                </Text>
                                </Body>
                              </CardItem>
                              <CardItem footer>
                                <Text>Date: {this.formatDate(incident.timestamp)}</Text>
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
                      onPress={() => Actions.report()}
              >
                <Text>Report</Text>
              </Button>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}

export default ListPage;