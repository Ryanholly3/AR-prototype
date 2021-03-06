import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Button,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';

import {
  ViroSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import {
  TabNavigator, StackNavigator
} from 'react-navigation';

import MapView, { PROVIDER_GOOGLE, prototype } from 'react-native-maps';

// Calculate map zoom
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


// Dummy data
const exampleMarkers = [{
    latlng: { latitude: 59.9111556, longitude: 10.737842499999942 },
    adress: 'Nedre Vollgate 5',
    price: '10.000.000 kr',
  },
  {
    latlng: { latitude: 59.91101631213413, longitude: 10.737657845020294 },
    adress: 'Nedre Vollgate 3',
    price: '1 kr',
  },
  {
    latlng: { latitude: 59.91089528797505, longitude: 10.737555921077728 },
    adress: 'Nedre Vollgate 1',
    price: '2 kr',
  },
  {
    latlng: { latitude: 59.910752747844114, longitude: 10.737861692905426 },
    adress: 'Rådhusgata 23',
    price: '2 kr',
  },
  {
    latlng: { latitude: 59.911048585168686, longitude: 10.73813796043396 },
    adress: 'Nedre Vollgate 4',
    price: '3 kr',
  },
  {
    latlng: { latitude: 59.91126642733144, longitude: 10.738376677036285 },
    adress: 'Nedre Vollgate 8',
    price: '4 kr',
  },
  {
    latlng: { latitude: 59.91147082114731, longitude: 10.738140642642975 },
    adress: 'Nedre Vollgate 11',
    price: '5 kr',
  },
];

// Dummy id for example map markers
const id = 0;

/*
 react-viro AR API key
 */
var sharedProps = {
  apiKey:"48F904D3-E6A6-4D2F-B66A-FFBEC0CA4B69",
}

var InitialARScene = require('./ARScene');

export default class ViroSample extends React.Component {
  render() {
    return (
      <AppNavigator style={ styles.tabBar }/>
    );
  }
}

class ARScreen extends React.Component {
  constructor () {
    super();
    this.state = {
      sharedProps: sharedProps,
    }
  }
  static navigationOptions = {
    tabBarLabel: 'AR',
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('./icons/camera.png')
      }
      style={[styles.icon, {tintColor: tintColor}]} 
      />
    ),
  };
  render() {
    return (
      //husk API key
      <ViroARSceneNavigator {...this.state.sharedProps}
      initialScene={{scene: InitialARScene}} />
    );
  }
}

class GoogleMapsScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Google',
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('./icons/placeholder.png')
      }
      style={[styles.icon, {tintColor: tintColor}]} 
      />
    ),
  };

  constructor(){
    super();
    this.state = {
      markers: exampleMarkers,
      region: {
        latitude: 59.9111556,
        longitude: 10.737842499999942,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      currentPosition: {
        latitude: 0.0,
        longitude: 0.0,
      }
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  
  render() {
    return (
      <View style={styles.mainView}>
        <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        region={{ latitude: this.state.currentPosition.latitude,
                  longitude: this.state.currentPosition.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  }}
        mapType="standard"
        showsUserLocation={true}
        userLocationAnnotationTitle="Min posisjon"
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        showsIndoors={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
        scrollEnabled={true}
        >
        {this.state.markers.map(marker => (
        <MapView.Marker
          coordinate={marker.latlng}
          title={marker.adress}
          description={marker.price}
          key={id++}
        />
        ))}
        </MapView>
        <View style={styles.searchBarContainer}>
            <TextInput
              placeholder=" Søk..."
              style={styles.searchBar}
            />
        </View>
      </View>
    );
  }
}

const AppNavigator = TabNavigator({
  Google: { screen: GoogleMapsScreen },
  AR: { screen: ARScreen },
},
{
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  ar: {
    flex: 1,
  },
  mainView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  searchBar: {
    elevation: 1,
    width: '99%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchBarContainer: {
    elevation: 1,
    backgroundColor: 'white',
    width: '90%',
    height: '6%',
    marginLeft: '5%',
    top: 40,
    borderRadius: 3,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0},
  },
});

AppRegistry.registerComponent('prototype', () => prototype);
module.exports = ViroSample
