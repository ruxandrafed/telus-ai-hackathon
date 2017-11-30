import React from 'react';
import { Header, Content, Button ,
  Left, Body, Right, Icon, Title, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';

const AppHeader = ({ title, showBackButton=true }) => {
  return (
    <Header>
      { showBackButton
        ? (
          <Left>
            <Button transparent
                    onPress={() => Actions.pop()}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
        )
        : (
          <Left>
            <Icon name='bicycle' />
          </Left>
        ) }
      <Body>
      <Title>{title}</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Right>
    </Header>
  )
};

export default AppHeader;