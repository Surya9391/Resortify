import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationIndependentTree } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

// Import screens
import LoginScreen from '@/components/LoginScreen';
import CreateAccount from '@/components/CreateAccount';
import HomeScreen from '@/components/HomeScreen';
import MyProfileScreen from '@/components/MyprofileScreen';
import Logout from '@/components/Logout';
import Settings from '@/components/Settings';
import BinFillReminder from '@/components/BinFillReminder';
import RecyclingTips from '@/components/RecycleTips';
import AllbinLocator from '@/components/AllbinLocator';
import Collection from '@/components/Collection';
import RecycleRate from '@/components/RecyleRate';
import Graph from '@/components/Graph';
import About from '@/components/About';
import Contact from '@/components/Contact';
import VoiceAssistant from '@/components/voice/VoiceAssistant';
import ResourceHub from '@/components/education/ResourceHub';
import WasteIdentification from '@/components/waste/WasteIdentification';
import MapViewComponent from '@/components/maps/MapView';

// Conditionally import react-native-maps only on native platforms
// const MapView = Platform.OS !== 'web' ? require('react-native-maps').default : () => null;
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer Navigator for "Home", "My Profile", "Settings", and "Logout"
const DrawerNavigator = ({ onLogout }: { onLogout: () => void }) => (
  <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="My Profile" component={MyProfileScreen} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Logout">
      {props => <Logout {...props} onLogout={onLogout} />}
    </Drawer.Screen>
  </Drawer.Navigator>
);

// App Navigator
const AppNavigator = ({
  isLoggedIn,
  handleLogin,
  handleLogout,
}: {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isLoggedIn ? (
      <>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLogin={handleLogin} onCreateAccount={() => props.navigation.navigate('CreateAccount')} />}
        </Stack.Screen>
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </>
    ) : (
      <>
        <Stack.Screen name="Home">
          {props => <DrawerNavigator {...props} onLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen name="BinFillReminder" component={BinFillReminder} />
        <Stack.Screen name="RecycleTips" component={RecyclingTips} />
        <Stack.Screen name="AllbinLocator" component={AllbinLocator} />
        <Stack.Screen name="Collection" component={Collection} />
        <Stack.Screen name="RecycleRate" component={RecycleRate} />
        <Stack.Screen name="Graph" component={Graph} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="VoiceAssistant" component={VoiceAssistant} />
        <Stack.Screen name="ResourceHub" component={ResourceHub} />
        <Stack.Screen name="WasteIdentification" component={WasteIdentification} />
        <Stack.Screen 
          name="MapView" 
          component={MapViewComponent}
          initialParams={{ 
            latitude: 37.78825,
            longitude: -122.4324,
            zoom: 13 
          }}
        />
      </>
    )}
  </Stack.Navigator>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationIndependentTree>
    <NavigationContainer>
      <AppNavigator isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
    </NavigationContainer>
    </NavigationIndependentTree>
  );
}
