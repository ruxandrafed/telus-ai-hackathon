import React from 'react';
import {
  Scene,
  Router,
  Stack
} from 'react-native-router-flux';
import { AppRegistry } from 'react-native';
import LandingPage from './src/LandingPage';
import Report from './src/Report';
import List from './src/List';
import Map from './src/components/Map';

console.ignoredYellowBox = ['Remote debugger'];

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="landing" component={LandingPage} title="Home"/>
      <Scene key="report" component={Report} title="Report offenders"/>
      <Scene key="list" component={List} title="List offenders"/>
      <Scene key="map" component={Map} title="Map of offenders"/>
    </Stack>
  </Router>
);

AppRegistry.registerComponent('AI_Hack', () => App);

