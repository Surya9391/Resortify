import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { RootStackParamList } from './types';

const { width: screenWidth } = Dimensions.get('window');
const scaleFont = (size: number) => Math.round(size * screenWidth / 375);

const BinFillReminder = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [message, setMessage] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [binFillLevels, setBinFillLevels] = useState({
    wet: 0,
    dry: 0,
    metal: 0,
  });

  // Define images
  const images = {
    wet: require('../assets/images/wet.png'), // Replace with actual paths
    dry: require('../assets/images/dry.png'),
    metal: require('../assets/images/metal.png'),
    //default: require('../assets/images/default.png'),
  };

  // Fetch the latest bin fill levels and waste message from the server
  const fetchLatestData = async () => {
    try {
      const response = await fetch('http://192.168.29.149:3000/latest-data');
      const data = await response.json();

      if (data.message) {
        setMessage(data.message);
        if (data.message.toLowerCase().includes('metal')) {
          setImageSource(images.metal);
        } else if (data.message.toLowerCase().includes('wet')) {
          setImageSource(images.wet);
        } else if (data.message.toLowerCase().includes('dry')) {
          setImageSource(images.dry);
        }
      }

      if (data.binFill) {
        setBinFillLevels({
          wet: data.binFill.wetBin || 0,
          dry: data.binFill.dryBin || 0,
          metal: data.binFill.metalBin || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLatestData();
    const interval = setInterval(fetchLatestData, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.background}>
      <View style={styles.container}>
        <Ionicons name="alert-circle" size={scaleFont(100)} color="black" />
        <Text style={styles.title}>Bin Fill Reminder</Text>

        {/* Bin Fill Progress Bars */}
        <View style={styles.binInfoContainer}>
          <Text style={styles.info}>Wet Waste Bin - {Math.round(binFillLevels.wet)}% full</Text>
          <ProgressBar progress={binFillLevels.wet / 100} color="#4CAF50" style={styles.progressBar} />
        </View>

        <View style={styles.binInfoContainer}>
          <Text style={styles.info}>Dry Waste Bin - {Math.round(binFillLevels.dry)}% full</Text>
          <ProgressBar progress={binFillLevels.dry / 100} color="#FF9800" style={styles.progressBar} />
        </View>

        <View style={styles.binInfoContainer}>
          <Text style={styles.info}>Metal Waste Bin - {Math.round(binFillLevels.metal)}% full</Text>
          <ProgressBar progress={binFillLevels.metal / 100} color="#2196F3" style={styles.progressBar} />
        </View>

        {/* Waste Processing Message with Image */}
        <View style={styles.wasteBlock}>
          {imageSource && <Image source={imageSource} style={styles.wasteImage} />}
          <Text style={styles.wasteText}>{message || 'Waiting for waste processing ...'}</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.navButtonText}>Go to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('BinDetails')}>
            <Text style={styles.navButtonText}>Bin Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  binInfoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  info: {
    fontSize: scaleFont(16),
    textAlign: 'left',
    marginVertical: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  wasteBlock: {
    backgroundColor: '#FFF7E1',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  wasteImage: {
    width: 100, // Adjust size as needed
    height: 100,
    resizeMode: 'contain',
  },
  wasteText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%',
  },
  navButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  navButtonText: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});

export default BinFillReminder;