import React from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';

interface WebViewScreenProps {
  url: string;
  title?: string;
}

const WebViewScreen: React.FC<WebViewScreenProps> = ({ url }) => {
  const renderLoadingIndicator = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );

  // For web platform, use iframe instead of WebView
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src={url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </View>
    );
  }

  // For native platforms (iOS, Android)
  return (
    <View style={styles.container}>
      <RNWebView
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={renderLoadingIndicator}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default WebViewScreen; 