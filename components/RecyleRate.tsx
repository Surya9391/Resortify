import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const scaleFont = (size: number) => Math.round(size * screenWidth / 375);

const overallData = [
  {
    name: 'Recycled',
    population: 65,
    color: '#4CAF50',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Non-Recycled',
    population: 35,
    color: '#FF6347',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const recycledMaterialsData = [
  {
    name: 'General Recycled',
    population: 40,
    color: '#4CAF50',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Road Construction',
    population: 15,
    color: '#FFA500',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Farm Use',
    population: 10,
    color: '#8A2BE2',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const unwantedWasteData = [
  {
    name: 'Used for Electricity',
    population: 10,
    color: '#2E8B57',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Non-Recycled',
    population: 25,
    color: '#FF6347',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForLabels: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

const RecyclingRate = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderLegend = (data: { name: string; population: number; color: string; legendFontColor: string; legendFontSize: number; }[]) => {
    return data.map((item, index) => (
      <View key={index} style={styles.legendItem}>
        <View style={[styles.legendColor, { backgroundColor: item.color }]} />
        <Text style={styles.legendText}>{item.name}: {item.population}%</Text>
      </View>
    ));
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Recycling Rate</Text>

        <Text style={styles.subtitle}>Overall Recycling Rate</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={overallData}
            width={screenWidth * 0.9}
            height={screenWidth * 0.5}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {renderLegend(overallData)}
          </View>
        </View>
        <Text style={styles.infoText}>
          This chart shows the overall recycling rate in your community. A significant portion of waste is being recycled, but there's still room for improvement.
        </Text>

        <Text style={styles.subtitle}>Recycled Materials Breakdown</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={recycledMaterialsData}
            width={screenWidth * 0.9}
            height={screenWidth * 0.5}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {renderLegend(recycledMaterialsData)}
          </View>
        </View>
        <Text style={styles.infoText}>
          This chart breaks down the recycled materials into different categories. Most of the recycled materials are used for general recycling purposes, followed by road construction and farm use.
        </Text>

        <Text style={styles.subtitle}>Use of Recycled Materials</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={recycledMaterialsData}
            width={screenWidth * 0.9}
            height={screenWidth * 0.5}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {renderLegend(recycledMaterialsData)}
          </View>
        </View>
        <Text style={styles.infoText}>
          This chart shows how the recycled materials are being utilized. The majority is used for general recycling, with significant portions going to road construction and farm use.
        </Text>

        <Text style={styles.subtitle}>Unwanted Waste Management</Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={unwantedWasteData}
            width={screenWidth * 0.9}
            height={screenWidth * 0.5}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {renderLegend(unwantedWasteData)}
          </View>
        </View>
        <Text style={styles.infoText}>
          This chart highlights the management of unwanted waste. A portion of it is used to generate electricity, while the rest remains non-recycled.
        </Text>

        <View style={styles.infoContainer}>
          <MaterialIcons name="recycling" size={scaleFont(50)} color="green" />
          <Text style={styles.infoText}>
            The recycling rate in your community is currently at 65%. Recycled materials are used in road construction, biodegradable waste is forwarded to farmers, and unwanted waste is fired to produce electricity.
            Let's work together to improve this and reduce the non-recycled waste!
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <FontAwesome.Button name="home" backgroundColor="#3b5998" onPress={() => navigation.navigate('Home')}>
            Go to Home
          </FontAwesome.Button>
          <FontAwesome.Button name="info-circle" backgroundColor="#ff6347" onPress={() => navigation.navigate('RecycleTips')}>
            Recycling Tips
          </FontAwesome.Button>
        </View>
      </ScrollView>
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
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  legendContainer: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: scaleFont(16),
    color: 'black',
  },
  infoText: {
    fontSize: scaleFont(16),
    color: '#7F7F7F',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#ffffff80',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0 ,0.1)',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default RecyclingRate;