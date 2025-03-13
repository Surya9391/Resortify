import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const AllbinLocator: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [latestMessage, setLatestMessage] = useState<string>('');
  const [latestCoordinates, setLatestCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required to use the map feature.');
          setLoading(false);
          return;
        }

        // Get user location
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // Fetch latest data from the server
        const response = await fetch('http://192.168.29.149:3000/latest-data');
        const data = await response.json();
        //setLatestMessage(data.message);
        setLatestCoordinates(data.coordinates);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00f" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation?.latitude || 37.78825,
              longitude: userLocation?.longitude || -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {latestCoordinates && (
              <Marker
                coordinate={{
                  latitude: latestCoordinates.latitude,
                  longitude: latestCoordinates.longitude,
                }}
                title="Latest Bin"
                pinColor="green"
              />
            )}
          </MapView>
        </>
      ) : (
        <Text style={styles.webMessage}>Map is not available on the web platform.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  messageText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  webMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllbinLocator;