import React from 'react';
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
} from 'react-native';

import {
  ViroSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import {
  TabNavigator, StackNavigator
} from 'react-navigation';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator style={ styles.tabBar }/>
    );
  }
}

class ARScreen extends React.Component {
  constructor () {
    super();
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
        <Text>AR</Text>
    );
  }
}

class GoogleMapsScreen extends React.Component {
  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  
  changeRegion(region) {
    this.setState({region});
  }

  constructor(){
    super();
    this.state = {
      markers: [],
      region: {
        latitude: 59.9111556,
        longitude: 10.737842499999942,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      direction: "",
      location: {
        latitude: 0.0,
        longitude: 0.0,
      }
    }
    /*
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    */
  }
  static navigationOptions = {
    tabBarLabel: 'Google',
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('./icons/placeholder.png')
      }
      style={[styles.icon, {tintColor: tintColor}]} 
      />
    ),
  };
  render() {
    return (
      //husk API key
      /* deltas: latitudeDelta: 0.0043,
      longitudeDelta: 0.0034
      */
      <View style={styles.google}>
        <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        region={{
          latitude: 59.9111556,
          longitude: 10.737842499999942,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        mapType="standard"
        showsUserLocation={true}
        userLocationAnnotationTitle="Meg"
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        showsIndoors={true}
        zoomEnabled={true}
        loadingEnabled={true}
        >
        {this.state.markers.map(marker => (
      <MapView.Marker
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
      />
      ))}
        </MapView>
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
  google: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

AppRegistry.registerComponent('prototype', () => prototype);
