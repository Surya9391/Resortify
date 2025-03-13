import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const About = () => {
  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.text}>
          This app is designed to help you manage your waste and recycling more effectively. 
          You can view bin fill levels, get reminders for bin collections, find recycling tips, 
          and locate all bins on a map. Our goal is to make waste management easier and more efficient for you.
        </Text>

        <View style={styles.section}>
          <MaterialIcons name="notifications" size={24} color="green" />
          <Text style={styles.sectionTitle}>Reminders & Notifications</Text>
          <Text style={styles.sectionText}>
            Get timely reminders for bin collections and notifications when bins are almost full. Never miss a collection day again!
          </Text>
        </View>

        <View style={styles.section}>
          <MaterialIcons name="lightbulb" size={24} color="green" />
          <Text style={styles.sectionTitle}>Recycling Tips</Text>
          <Text style={styles.sectionText}>
            Find helpful tips on how to recycle different types of waste. Learn the best practices to reduce, reuse, and recycle efficiently.
          </Text>
        </View>

        <View style={styles.section}>
          <MaterialIcons name="map" size={24} color="green" />
          <Text style={styles.sectionTitle}>Bin Locator</Text>
          <Text style={styles.sectionText}>
            Locate all bins on a map to find the nearest one to you. Easily navigate to the nearest recycling and waste disposal points.
          </Text>
        </View>

        <View style={styles.section}>
          <MaterialIcons name="schedule" size={24} color="green" />
          <Text style={styles.sectionTitle}>Collection Schedule</Text>
          <Text style={styles.sectionText}>
            Manage your waste collection schedule. View upcoming collection dates and plan your waste disposal accordingly.
          </Text>
        </View>

        <View style={styles.section}>
          <MaterialIcons name="bar-chart" size={24} color="green" />
          <Text style={styles.sectionTitle}>Recycling Rates</Text>
          <Text style={styles.sectionText}>
            View recycling rates and trends in your community. Track progress and see how your efforts contribute to a cleaner environment.
          </Text>
        </View>

        <Text style={styles.text}>
          We hope this app helps you in your efforts to manage waste and recycle more effectively. 
          If you have any questions or feedback, please feel free to contact us.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default About;
