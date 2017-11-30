import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';
import helpers from '../helpers/index';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 49.2827;
const LONGITUDE = -123.1207;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Callouts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: props.incidents.map(incident => {
        return {
          coordinate: {
            latitude: incident.latitude,
            longitude: incident.longitude,
          },
          licencePlate: incident.licencePlate,
          confidence: incident.confidence,
          timestamp: incident.timestamp
        }
      }),
    };
  }

  render() {
    const { region, markers } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          {markers.map(marker => {
            return (
              <MapView.Marker
                key={marker.licencePlate}
                coordinate={marker.coordinate}
                title={marker.licencePlate}
                pinColor={helpers.getColor(marker.confidence)}
                description={`${marker.confidence}% confidence. Submitted on: ${helpers.formatDate(marker.timestamp)}`}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 100,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default Callouts;