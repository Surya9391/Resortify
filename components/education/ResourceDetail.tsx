import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

interface ResourceDetailProps {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  type: 'article' | 'video' | 'act';
  url?: string;
  thumbnail?: string;
  fullContent?: string;
  additionalInfo?: {
    keyPoints: string[];
    implementation: string;
    penalties?: string;
    amendments?: string[];
    relatedActs?: string[];
    downloadLink?: string;
  };
}

const ResourceDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const resource = route.params as ResourceDetailProps;

  const renderActDetail = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.title}>{resource.title}</Text>
      <Text style={styles.date}>Effective Date: {resource.date}</Text>
      <Text style={styles.source}>{resource.source}</Text>
      
      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={styles.content}>{resource.content}</Text>

      {resource.additionalInfo?.keyPoints && (
        <>
          <Text style={styles.sectionTitle}>Key Points</Text>
          {resource.additionalInfo.keyPoints.map((point, index) => (
            <Text key={index} style={styles.bulletPoint}>• {point}</Text>
          ))}
        </>
      )}

      {resource.additionalInfo?.implementation && (
        <>
          <Text style={styles.sectionTitle}>Implementation Guidelines</Text>
          <Text style={styles.content}>{resource.additionalInfo.implementation}</Text>
        </>
      )}

      {resource.additionalInfo?.penalties && (
        <>
          <Text style={styles.sectionTitle}>Penalties for Non-Compliance</Text>
          <Text style={styles.content}>{resource.additionalInfo.penalties}</Text>
        </>
      )}

      {resource.additionalInfo?.amendments && (
        <>
          <Text style={styles.sectionTitle}>Amendments</Text>
          {resource.additionalInfo.amendments.map((amendment, index) => (
            <Text key={index} style={styles.bulletPoint}>• {amendment}</Text>
          ))}
        </>
      )}

      {resource.additionalInfo?.downloadLink && (
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => navigation.navigate('WebView', { url: resource.additionalInfo?.downloadLink })}
        >
          <Text style={styles.downloadText}>Download Full Document</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );

  const renderArticleOrVideo = () => (
    <View style={styles.webviewContainer}>
      <WebView 
        source={{ uri: resource.url || '' }}
        style={styles.webview}
      />
    </View>
  );

  return (
    <LinearGradient colors={['#B5FFFC', '#FFDEE9']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {resource.type === 'act' ? 'Act Details' : resource.type === 'article' ? 'Article' : 'Video'}
        </Text>
      </View>

      {resource.type === 'act' ? renderActDetail() : renderArticleOrVideo()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
    marginBottom: 8,
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  downloadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ResourceDetail; 