import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WasteIdentification = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      // Here you would integrate with AI service
      analyzeWaste(photo.uri);
    }
  };

  const analyzeWaste = async (imageUri: string) => {
    // Simulate AI analysis
    setResult('This appears to be recyclable plastic (Type 1 PET).');
  };

  let camera: any = null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#4CAF50" />
      </TouchableOpacity>
      {!photo ? (
        <Camera
          style={styles.camera}
          ref={(r: any) => (camera = r)}
          type={CameraType.back}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Ionicons name="camera" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.resultContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <Text style={styles.resultText}>{result}</Text>
          <TouchableOpacity 
            style={styles.retakeButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.buttonText}>Retake Photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 50,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 50,
  },
});

export default WasteIdentification; 