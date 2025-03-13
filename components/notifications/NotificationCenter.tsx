import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import messaging from '@react-native-firebase/messaging';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'event' | 'schedule' | 'alert';
  timestamp: Date;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Recycling Day',
      message: 'Tomorrow is paper recycling day',
      type: 'schedule',
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        Alert.alert('Notification Permission', 'Please enable notifications in settings.');
      }
    };

    requestUserPermission();

    // Listen for FCM messages when the app is in foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      const newNotification: Notification = {
        id: remoteMessage.messageId || Math.random().toString(),
        title: remoteMessage.notification?.title || 'New Notification',
        message: remoteMessage.notification?.body || '',
        type: 'alert',
        timestamp: new Date(),
      };

      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    });

    return unsubscribe;
  }, []);

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={item.type === 'event' ? 'calendar' : 'notifications'} 
          size={24} 
          color="#4CAF50" 
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    marginVertical: 1,
    borderRadius: 8,
    margin: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#666',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default NotificationCenter;
