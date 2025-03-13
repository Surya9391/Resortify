import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp, DrawerActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Entypo, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

interface MenuItem {
  id: string;
  title: string;
  icon: any;
  iconType: 'MaterialIcons' | 'FontAwesome5' | 'Ionicons' | 'MaterialCommunityIcons';
  route: keyof RootStackParamList;
  description: string;
  color: string;
  image: any;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Waste ID',
    icon: 'camera',
    iconType: 'MaterialIcons',
    route: 'WasteIdentification',
    description: 'Scan & identify waste',
    color: '#4CAF50',
    image: require('../assets/images/camera.jpg'),
  },
  {
    id: '2',
    title: 'Resources',
    icon: 'library-books',
    iconType: 'MaterialIcons',
    route: 'ResourceHub',
    description: 'Learn about recycling',
    color: '#2196F3',
    image: require('../assets/images/education.png'),
  },
  {
    id: '3',
    title: 'Voice Assistant',
    icon: 'mic',
    iconType: 'MaterialIcons',
    route: 'VoiceAssistant',
    description: 'Ask recycling questions',
    color: '#9C27B0',
    image: require('../assets/images/voice.png'),
  },
  {
    id: '4',
    title: 'Bin Fill Reminder',
    icon: 'bell',
    iconType: 'MaterialCommunityIcons',
    route: 'BinFillReminder',
    description: 'Get notified',
    color: '#FF9800',
    image: require('../assets/images/fill.png'),
  },
  {
    id: '5',
    title: 'Recycling Tips',
    icon: 'recycle',
    iconType: 'FontAwesome5',
    route: 'RecycleTips',
    description: 'Daily recycling tips',
    color: '#00BCD4',
    image: require('../assets/images/rs.png'),
  },
  {
    id: '6',
    title: 'Bin Locator',
    icon: 'map-marker',
    iconType: 'MaterialCommunityIcons',
    route: 'AllbinLocator',
    description: 'Find nearest bins',
    color: '#E91E63',
    image: require('../assets/images/allbin.png'),
  },
  {
    id: '7',
    title: 'Analytics',
    icon: 'chart-bar',
    iconType: 'MaterialCommunityIcons',
    route: 'Graph',
    description: 'View statistics',
    color: '#673AB7',
    image: require('../assets/images/graph.png'),
  },
  {
    id: '8',
    title: 'Collection',
    icon: 'trash-can',
    iconType: 'MaterialCommunityIcons',
    route: 'Collection',
    description: 'Schedule pickup',
    color: '#795548',
    image: require('../assets/images/collection.png'),
  },
  {
    id: '9',
    title: 'Recycle Rate',
    icon: 'trending-up',
    iconType: 'MaterialIcons',
    route: 'RecycleRate',
    description: 'Track your progress',
    color: '#FF5722',
    image: require('../assets/images/rr.png'),
  },
  {
    id: '10',
    title: 'About',
    icon: 'info',
    iconType: 'MaterialIcons',
    route: 'About',
    description: 'Learn more about us',
    color: '#607D8B',
    image: require('../assets/images/about.png'),
  },
  {
    id: '11',
    title: 'Contact',
    icon: 'mail',
    iconType: 'MaterialIcons',
    route: 'Contact',
    description: 'Get in touch',
    color: '#795548',
    image: require('../assets/images/contact.png'),
  },
];

const arrangeItems = (items: MenuItem[]): MenuItem[][] => {
  const arranged: MenuItem[][] = [];
  let index = 0;
  
  while (index < items.length) {
    // Add 2 items row
    if (items[index] && items[index + 1]) {
      arranged.push([items[index], items[index + 1]]);
      index += 2;
    }
    // Add 1 item row
    if (items[index]) {
      arranged.push([items[index]]);
      index += 1;
    }
  }
  return arranged;
};

function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderIcon = (item: MenuItem) => {
    const props = { size: 24, color: item.color };
    switch (item.iconType) {
      case 'MaterialIcons':
        return <MaterialIcons name={item.icon} {...props} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={item.icon} {...props} />;
      case 'Ionicons':
        return <Ionicons name={item.icon} {...props} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={item.icon} {...props} />;
    }
  };

  const renderItem = (item: MenuItem) => (
    <TouchableOpacity
  style={styles.card}
  onPress={() => {
    if (item.route) {
      navigation.navigate(item.route);
    } else {
      console.warn("Navigation route is missing");
    }
  }}
>
  <Image 
    source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
    style={[styles.cardImage, styles.largeCardImage]} 
  />
  <View style={styles.cardContent}>
    <View style={styles.iconContainer}>
      {renderIcon(item)}
    </View>
    <Text style={styles.cardTitle}>{item.title}</Text>
    <Text style={styles.cardDescription}>{item.description}</Text>
  </View>
</TouchableOpacity>

  );

  return (
    <LinearGradient 
      colors={['#FFDEE9', '#B5FFFC']} 
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuButton}
        >
          <Entypo name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Home')}
          style={styles.homeButton}
        >
          <Ionicons name="home" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gridContainer}>
          {arrangeItems(menuItems).map((row, rowIndex) => (
            <View 
              key={rowIndex} 
              style={[
                styles.row,
                { justifyContent: row.length === 1 ? 'center' : 'space-between' }
              ]}
            >
              {row.map((item) => (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.cardContainer,
                    // Increase size for specific rows
                    (rowIndex === 2 || rowIndex === 4 || rowIndex === 6) && styles.largeCardContainer,
                    row.length === 1 && styles.singleCardContainer,
                    {
                      opacity: fadeAnim,
                      transform: [{
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30 * (rowIndex + 1), 0]
                        })
                      }]
                    }
                  ]}
                >
                  {renderItem(item)}
                </Animated.View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  menuButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  homeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  gridContainer: {
    padding: 16,
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardContainer: {
    width: width / 2 - 24,
    height: 140,
  },
  largeCardContainer: {
    height: 170,
  },
  card: {
    flex: 1,
    height: 180,
    margin: 8,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  expandedCard: {
    height: 200,
    marginHorizontal: 16,
  },
  enhancedCard: {
    height: 220,
  },
  cardImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  largeCardImage: {
    height: 100,
  },
  cardContent: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
  },
  singleCardContainer: {
    width: width - 32,
    height: 120,
  },
  iconContainer: {
    position: 'absolute',
    top: -16,
    right: 8,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  statsContainer: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  singleCard: {
    height: 200,
    marginHorizontal: 16,
  },
});

export default HomeScreen;