import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from './types';
import Collapsible from './Collapsible';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply the dark mode setting to the app
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleLocationAccess = () => {
    setLocationAccess(!locationAccess);
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="person" size={24} color="black" />
            <Text style={styles.sectionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="lock" size={24} color="black" />
            <Text style={styles.sectionText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <Collapsible title="Notifications">
          <View style={styles.settingItem}>
            <Text>Recycling Alerts</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>
          <View style={styles.settingItem}>
            <Text>Collection Schedule Updates</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>
        </Collapsible>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <TouchableOpacity style={styles.row}>
            <MaterialIcons name="privacy-tip" size={24} color="black" />
            <Text style={styles.sectionText}>Privacy Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="help-circle" size={24} color="black" />
            <Text style={styles.sectionText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <TouchableOpacity style={styles.row} onPress={toggleDarkMode}>
            <Ionicons name={darkMode ? "sunny" : "moon"} size={24} color="black" />
            <Text style={styles.sectionText}>{darkMode ? "Light Mode" : "Dark Mode"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound</Text>
          <View style={styles.row}>
            <Ionicons name="volume-high" size={24} color="black" />
            <Text style={styles.sectionText}>Enable Sound</Text>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.row}>
            <Ionicons name="location" size={24} color="black" />
            <Text style={styles.sectionText}>Enable Location Access</Text>
            <Switch
              value={locationAccess}
              onValueChange={toggleLocationAccess}
              style={styles.switch}
            />
          </View>
        </View>

        <Collapsible title="Language">
          <View>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  selectedLanguage === lang.code && styles.selectedLanguage,
                ]}
                onPress={() => setSelectedLanguage(lang.code)}
              >
                <Text>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Collapsible>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.row}>
            <Ionicons name="information-circle" size={24} color="black" />
            <Text style={styles.sectionText}>About This App</Text>
          </TouchableOpacity>
        </View>

        <Collapsible title="Accessibility">
          <View style={styles.settingItem}>
            <Text>Offline Access</Text>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
            />
          </View>
          <View style={styles.settingItem}>
            <Text>Voice Assistant</Text>
            <Switch
              value={voiceAssistant}
              onValueChange={setVoiceAssistant}
            />
          </View>
        </Collapsible>

        <Collapsible title="App Preferences">
          <View style={styles.settingItem}>
            <Text>Enable Animations</Text>
            <Switch
              value={true}
              onValueChange={() => {}}
            />
          </View>
          <View style={styles.settingItem}>
            <Text>AI Waste Identification</Text>
            <Switch
              value={true}
              onValueChange={() => {}}
            />
          </View>
        </Collapsible>
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
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  section: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#ffffff80',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  switch: {
    marginLeft: 'auto',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  languageItem: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
  },
  selectedLanguage: {
    backgroundColor: '#e3e3e3',
  },
});

export default SettingsScreen;
