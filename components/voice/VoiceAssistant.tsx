import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as Speech from 'expo-speech';
import axios from 'axios';

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
const API_URL = 'https://api.openai.com/v1/chat/completions';

const RESPONSES = {
  default: "I'm not sure about that. Please check our recycling guidelines.",
  greetings: ["hello", "hi", "hey"],
  queries: {
    glass: "Glass bottles and jars can be recycled. Please rinse them and remove any lids.",
    plastic: "Most plastic containers with recycling numbers 1-7 can be recycled. Check the bottom for the number.",
    paper: "Clean paper, cardboard, and newspapers can be recycled. Avoid recycling soiled paper products.",
    metal: "Metal cans, aluminum foil, and clean metal containers can be recycled.",
    electronic: "Electronic waste should be taken to special e-waste recycling centers.",
    battery: "Batteries should be recycled at designated collection points, not in regular bins.",
    food: "Food waste should be composted if possible. Check local composting guidelines.",
  }
};

const VoiceAssistant = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');

  const handleVoiceCommand = async () => {
    setIsListening(true);
    try {
      // Simulate speech recognition
      setTranscript("What can I recycle?");
      processQuery("What can I recycle?");
    } catch (error) {
      console.error('Error:', error);
    }
    setIsListening(false);
  };

  const processQuery = async (query: string) => {
    try {
      setResponse('Processing your query...');
      
      const response = await axios.post(API_URL, 
        {
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: "You are a recycling expert assistant. Provide concise, helpful answers about recycling, waste management, and environmental sustainability."
          }, {
            role: "user",
            content: query
          }],
          temperature: 0.7,
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const answer = response.data.choices[0].message.content;
      setResponse(answer);
      Speech.speak(answer);
      
    } catch (error) {
      console.error('Error:', error);
      // Fallback to basic responses
      const fallbackResponse = getFallbackResponse(query);
      setResponse(fallbackResponse);
      Speech.speak(fallbackResponse);
    }
  };

  const getFallbackResponse = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    // Enhanced local responses
    if (lowercaseQuery.includes('plastic')) {
      return "Most plastic containers with recycling numbers 1-7 can be recycled. Always check local guidelines and clean containers before recycling.";
    }
    if (lowercaseQuery.includes('paper')) {
      return "Clean paper, cardboard, and newspapers can be recycled. Avoid recycling soiled or food-contaminated paper products.";
    }
    if (lowercaseQuery.includes('glass')) {
      return "Glass bottles and jars can be recycled. Remove caps and rinse containers before recycling.";
    }
    if (lowercaseQuery.includes('metal')) {
      return "Most metal cans, aluminum foil, and clean containers can be recycled. Rinse items and check local guidelines.";
    }
    if (lowercaseQuery.includes('electronic') || lowercaseQuery.includes('electronics')) {
      return "Electronic waste should be taken to specialized e-waste recycling centers. Never dispose of electronics in regular trash.";
    }

    return "I'm not sure about that specific query. Please check your local recycling guidelines or try asking about common materials like plastic, paper, glass, or metal.";
  };

  const handleTextSubmit = () => {
    setTranscript(input);
    processQuery(input);
    setInput('');
  };

  return (
    <LinearGradient colors={['#B5FFFC', '#FFDEE9']} style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Assistant</Text>
      </View>
      
      <ScrollView style={styles.conversationContainer}>
        {transcript && (
          <Animatable.View animation="fadeInUp" style={styles.messageContainer}>
            <Text style={styles.userMessage}>{transcript}</Text>
          </Animatable.View>
        )}
        {response && (
          <Animatable.View animation="fadeInUp" style={styles.messageContainer}>
            <Text style={styles.assistantMessage}>{response}</Text>
          </Animatable.View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleTextSubmit}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleTextSubmit}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.micButton, isListening && styles.listening]}
        onPress={handleVoiceCommand}
      >
        <Ionicons 
          name={isListening ? "radio" : "mic"} 
          size={32} 
          color="white" 
        />
      </TouchableOpacity>
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
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  conversationContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginVertical: 8,
  },
  userMessage: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 5,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  assistantMessage: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  micButton: {
    backgroundColor: '#4CAF50',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  listening: {
    backgroundColor: '#FF4444',
  },
});

export default VoiceAssistant;