import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

// Using OpenWeatherMap API for weather-based collection scheduling
const WEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast`;

// Add API configuration
const WASTE_API_URL = 'https://api.recollect.net/api/areas';
const API_KEY = 'YOUR_API_KEY';

interface CollectionSchedule {
  id: string;
  date: string;
  type: 'general' | 'recycling' | 'organic';
  status: 'scheduled' | 'completed' | 'delayed';
  weather: string;
}

interface CollectionItem {
  id: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  day: string;
  type: string;
  info: string;
}

interface WasteCollectionData {
  id: string;
  service_name: string;
  next_collection: string;
  frequency: string;
  materials: string[];
}

const generateSchedule = (weatherData: any): CollectionItem[] => {
  return [
    {
      id: '1',
      color: '#4CAF50',
      icon: 'calendar',
      day: 'Monday',
      type: 'General Waste',
      info: 'Collection between 8AM - 12PM',
    },
    {
      id: '2',
      color: '#2196F3',
      icon: 'refresh',
      day: 'Tuesday',
      type: 'Recycling',
      info: 'Collection between 1PM - 5PM',
    },
    {
      id: '3',
      color: '#FF9800',
      icon: 'leaf',
      day: 'Wednesday',
      type: 'Garden Waste',
      info: 'Collection between 9AM - 2PM',
    },
    {
      id: '4',
      color: '#9C27B0',
      icon: 'trash',
      day: 'Thursday',
      type: 'Mixed Recycling',
      info: 'Collection between 10AM - 3PM',
    },
    {
      id: '5',
      color: '#F44336',
      icon: 'warning',
      day: 'Friday',
      type: 'Hazardous Waste',
      info: 'Special Collection Day',
    }
  ];
};

const Collection = () => {
  const [schedule, setSchedule] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use mock data directly instead of API call
    const mockData: CollectionItem[] = [
      {
        id: '1',
        color: '#4CAF50',
        icon: 'trash',
        day: 'Monday',
        type: 'General Waste',
        info: 'Collection between 8AM - 12PM',
      },
      {
        id: '2',
        color: '#2196F3',
        icon: 'refresh',
        day: 'Tuesday',
        type: 'Recycling',
        info: 'Collection between 1PM - 5PM',
      },
      {
        id: '3',
        color: '#FF9800',
        icon: 'leaf',
        day: 'Wednesday',
        type: 'Garden Waste',
        info: 'Collection between 9AM - 2PM',
      },
      {
        id: '4',
        color: '#9C27B0',
        icon: 'trash',
        day: 'Thursday',
        type: 'Mixed Recycling',
        info: 'Collection between 10AM - 3PM',
      },
      {
        id: '5',
        color: '#F44336',
        icon: 'warning',
        day: 'Friday',
        type: 'Hazardous Waste',
        info: 'Special Collection Day',
      }
    ];
    setSchedule(mockData);
  }, []);

  const getColorForService = (service: string): string => {
    const colors: { [key: string]: string } = {
      'General Waste': '#4CAF50',
      'Recycling': '#2196F3',
      'Garden Waste': '#FF9800',
      'Hazardous': '#F44336',
      'default': '#9C27B0'
    };
    return colors[service] || colors.default;
  };

  const getIconForService = (service: string): keyof typeof Ionicons.glyphMap => {
    const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
      'General Waste': 'trash',
      'Recycling': 'refresh',
      'Garden Waste': 'leaf',
      'Hazardous': 'warning',
      'default': 'calendar'
    };
    return icons[service] || icons.default;
  };

  const renderItem = ({ item }: { item: CollectionItem }) => (
    <TouchableOpacity style={[styles.item, { borderLeftColor: item.color }]}>
      <Ionicons name={item.icon} size={35} color={item.color} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.day, { color: item.color }]}>{item.day}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.info}>{item.info}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#B5FFFC', '#FFDEE9']} style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#B5FFFC', '#FFDEE9']} style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => {}}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#B5FFFC', '#FFDEE9']} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Waste Collection Schedule</Text>
        <FlatList
          data={schedule}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    width: width * 0.9,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    transform: [{ scale: 1 }],
    //transition: 'all 0.3s ease-in-out',
  },
  itemHover: {
    transform: [{ scale: 1.05 }],
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  day: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  type: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    color: 'darkgray',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Collection;
