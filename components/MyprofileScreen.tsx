import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from './types';

const MyProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const profileImage = gender === 'male' 
    ? 'https://via.placeholder.com/150/0077ff/ffffff?text=Male' 
    : 'https://via.placeholder.com/150/ff69b4/ffffff?text=Female';

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => setGender(gender === 'male' ? 'female' : 'male')}>
          <MaterialIcons name="edit" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Picture and Basic Info */}
        <Animated.View style={{ ...styles.profileContainer, opacity: fadeAnim }}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </Animated.View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>John Doe</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>john.doe@example.com</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>+1234567890</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Gender:</Text>
            <Text style={styles.infoValue}>{gender === 'male' ? 'Male' : 'Female'}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>123 Main St, City, Country</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Date of Birth:</Text>
            <Text style={styles.infoValue}>January 1, 1990</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Nationality:</Text>
            <Text style={styles.infoValue}>American</Text>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {['React', 'JavaScript', 'UI/UX Design', 'Python', 'Node.js'].map((skill, index) => (
              <Text key={index} style={styles.skillBadge}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {/* Hobbies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hobbies</Text>
          <Text style={styles.sectionText}>
            John enjoys hiking, photography, playing guitar, and exploring new technologies.
          </Text>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            John is a software engineer passionate about building innovative and scalable applications. He has a knack for solving complex problems and loves contributing to open-source projects.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.row}>
            <Ionicons name="mail" size={24} color="black" />
            <Text style={styles.contactText}>john.doe@example.com</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="call" size={24} color="black" />
            <Text style={styles.contactText}>+1234567890</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="location" size={24} color="black" />
            <Text style={styles.contactText}>123 Main St, City, Country</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFDEE9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  section: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  infoValue: {
    fontSize: 16,
    color: 'black',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#FFB6C1',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 14,
    marginRight: 10,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
});

export default MyProfileScreen;