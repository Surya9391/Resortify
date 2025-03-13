import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
 TouchableOpacity,
 ActivityIndicator,
 ImageBackground,
 KeyboardAvoidingView,
 Platform,
 Animated,
 Easing,
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxDvkm9Vzqwel4mAc9DfBBR0_U-rJZiBk",
  authDomain: "smartwaste-54ef4.firebaseapp.com",
  projectId: "smartwaste-54ef4",
  storageBucket: "smartwaste-54ef4.firebasestorage.app",
  messagingSenderId: "290747380125",
  appId: "1:290747380125:web:11a530e66849effa523f74",
  measurementId: "G-PVPMS0PLJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
interface LoginScreenProps {
 onLogin: () => void;
 onCreateAccount: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onCreateAccount }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [isSignUp, setIsSignUp] = useState(false);

 // Animation values
 const fadeAnim = useRef(new Animated.Value(0)).current;
 const scaleAnim = useRef(new Animated.Value(0.9)).current;
 const slideAnim = useRef(new Animated.Value(50)).current;

 useEffect(() => {
   Animated.parallel([
     Animated.timing(fadeAnim, {
       toValue: 1,
       duration: 1000,
       useNativeDriver: true,
     }),
     Animated.spring(scaleAnim, {
       toValue: 1,
       friction: 4,
       useNativeDriver: true,
     }),
     Animated.timing(slideAnim, {
       toValue: 0,
       duration: 800,
       easing: Easing.out(Easing.exp),
       useNativeDriver: true,
     }),
   ]).start();
 }, []);

 const validateEmail = (email: string) => {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email);
 };

 const handleAuthentication = async () => {
   if (!email || !password) {
     Alert.alert('Error', 'Please fill in all fields');
     return;
   }

   if (!validateEmail(email)) {
     Alert.alert('Error', 'Please enter a valid email address');
     return;
   }

   setIsLoading(true);

   try {
     if (isSignUp) {
       await createUserWithEmailAndPassword(auth, email, password);
       Alert.alert('Success', 'Account created successfully');
       onCreateAccount(); // Call the parent handler after successful account creation
     } else {
       await signInWithEmailAndPassword(auth, email, password);
       onLogin(); // Call the parent handler after successful login
     }
   } catch (error: any) {
     Alert.alert('Error', error.message);
   } finally {
     setIsLoading(false);
   }
 };

 const handleForgotPassword = () => {
   Alert.alert('Forgot Password', 'Password reset instructions have been sent to your email.');
 };

 return (
   <ImageBackground
     source={require('@/assets/images/login.jpg')}
     style={styles.background}
     resizeMode="cover"
   >
     <KeyboardAvoidingView 
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.container}
     >
       <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
         <FontAwesome name="hotel" size={60} color="#fff" />
         <Text style={styles.logoText}>Resortify</Text>
       </Animated.View>

       <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
         <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Welcome Back!'}</Text>
         <Text style={styles.subtitle}>{isSignUp ? 'Sign up to get started' : 'Log in to continue'}</Text>
       </Animated.View>

       <Animated.View style={{ width: '100%', opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
         <View style={styles.inputContainer}>
           <MaterialIcons name="email" size={24} color="black" />
           <TextInput
             style={styles.input}
             placeholder="Email"
             keyboardType="email-address"
             value={email}
             onChangeText={setEmail}
             autoCapitalize="none"
           />
         </View>

         <View style={styles.inputContainer}>
           <MaterialIcons name="lock" size={24} color="black" />
           <TextInput
             style={styles.input}
             placeholder="Password"
             secureTextEntry={!showPassword}
             value={password}
             onChangeText={setPassword}
           />
           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
             <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
           </TouchableOpacity>
         </View>

         {!isSignUp && (
           <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
           </TouchableOpacity>
         )}

         <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
           {isLoading ? (
             <ActivityIndicator color="#fff" />
           ) : (
             <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
           )}
         </TouchableOpacity>

         <View style={styles.divider}>
           <View style={styles.dividerLine} />
           <Text style={styles.dividerText}>OR</Text>
           <View style={styles.dividerLine} />
         </View>

         <TouchableOpacity style={styles.button} onPress={() => setIsSignUp(!isSignUp)}>
           <Text style={styles.buttonText}>
             {isSignUp ? 'Already have an account? Log in' : 'Create New Account'}
           </Text>
         </TouchableOpacity>
       </Animated.View>
     </KeyboardAvoidingView>
   </ImageBackground>
 );
};

const styles = StyleSheet.create({
 background: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   paddingHorizontal: 16,
   width: '100%',
 },
 logoContainer: {
   alignItems: 'center',
   marginBottom: 40,
 },
 logoText: {
   color: '#fff',
   fontSize: 28,
   fontWeight: 'bold',
   marginTop: 10,
 },
 title: {
   color: '#fff',
   fontSize: 24,
   fontWeight: 'bold',
   textAlign: 'center',
   marginBottom: 10,
 },
 subtitle: {
   color: '#fff',
   fontSize: 16,
   textAlign: 'center',
   marginBottom: 20,
 },
 inputContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderRadius: 8,
   padding: 10,
   marginBottom: 20,
   width: '100%',
 },
 input: {
   flex: 1,
   marginLeft: 10,
   color: '#000',
 },
 forgotPasswordButton: {
   alignSelf: 'flex-end',
   marginBottom: 20,
   //backgroundColor: '#fff',
   paddingVertical: 12,
   paddingHorizontal: 20,
   borderRadius: 8,
   alignItems: 'center',
   justifyContent: 'center',
 },
 forgotPasswordText: {
   color: '#000',
   fontSize: 16,
   fontWeight: 'bold',
 },
 button: {
   backgroundColor: '#4CAF50',
   paddingVertical: 12,
   paddingHorizontal: 20,
   borderRadius: 8,
   width: '100%',
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 20,
 },
 buttonText: {
   color: '#fff',
   fontSize: 16,
   fontWeight: 'bold',
 },
 divider: {
   flexDirection: 'row',
   alignItems: 'center',
   marginVertical: 20,
 },
 dividerLine: {
   flex: 1,
   height: 1,
   backgroundColor: '#fff',
 },
 dividerText: {
   color: '#fff',
   marginHorizontal: 10,
 },
 createAccountButton: {
   backgroundColor: '#4CAF50',
   paddingVertical: 12,
   paddingHorizontal: 20,
   borderRadius: 8,
   width: '100%',
   alignItems: 'center',
   justifyContent: 'center',
 },
 createAccountButtonText: {
   color: '#fff',
   fontSize: 16,
   fontWeight: 'bold',
 },
});

export default LoginScreen;