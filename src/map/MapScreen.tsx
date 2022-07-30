import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const MapScreen = () => (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    ></MapView>
  </View>
)

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'green',
  },
})

export default MapScreen
