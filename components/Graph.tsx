import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// Using EPA API for recycling statistics
const EPA_API_URL = 'https://data.epa.gov/api/v1/recycling-stats';

interface RecyclingData {
  date: string;
  amount: number;
  type: string;
}

const screenWidth = Dimensions.get('window').width;
// Sample data
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const barData = {
  labels: ['Plastic', 'Metal', 'Paper', 'Glass', 'E-waste'],
  datasets: [
    {
      data: [40, 30, 50, 20, 10],
    },
  ],
};

const pieData = [
  { name: 'Plastic', population: 40, color: '#f39c12', legendFontColor: '#333', legendFontSize: 12 },
  { name: 'Metal', population: 30, color: '#e74c3c', legendFontColor: '#333', legendFontSize: 12 },
  { name: 'Paper', population: 50, color: '#2ecc71', legendFontColor: '#333', legendFontSize: 12 },
  { name: 'Glass', population: 20, color: '#3498db', legendFontColor: '#333', legendFontSize: 12 },
  { name: 'E-waste', population: 10, color: '#9b59b6', legendFontColor: '#333', legendFontSize: 12 },
];

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const Graph = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [data, setData] = useState<RecyclingData[]>([]);

  useEffect(() => {
    fetchRecyclingData();
  }, []);

  const fetchRecyclingData = async () => {
    try {
      // For demo, using mock data as EPA API requires registration
      const mockData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          }
        ]
      };
      setData(mockData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={30} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recycling Trends</Text>
        </View>

        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Monthly Recycling Rates</Text>
          <LineChart
            data={data}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Material Recycling Breakdown</Text>
          <BarChart
            data={barData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Material Distribution</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  chartContainer: {
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Graph;
