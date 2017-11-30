import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 49.2827;
const LONGITUDE = -123.1207;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

//  focusMap(markers, animated) {
//    console.log(`Markers received to populate map: ${markers}`);
//    this.map.fitToSuppliedMarkers(markers, animated);
//  }
//
//  focus1() {
//    animationTimeout = setTimeout(() => {
//      this.focusMap([
//        markerIDs[1],
//        markerIDs[4],
//      ], true);
//
//      this.focus2();
//    }, timeout);
//  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {this.props.incidents.map(incident => {
            return (
              <MapView.Marker
                key={incident.id}
                identifier={incident.licencePlate}
                coordinate={incident}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;