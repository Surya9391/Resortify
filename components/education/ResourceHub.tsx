import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { RootStackParamList } from '@/navigation/types';

// API endpoints
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';
const NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${NEWS_API_KEY}&q=recycling`;
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&q=recycling`;

interface ResourceSection {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  type: 'article' | 'video' | 'act';
  url?: string;
  thumbnail?: string;
}

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

const ResourceHub = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<ResourceSection[]>([]);
  const [videos, setVideos] = useState<ResourceSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'acts' | 'articles' | 'videos'>('acts');

  // Legal Acts and Information (Static Data)
  const acts: ResourceSection[] = [
    {
      id: '1',
      title: 'Solid Waste Management Rules, 2016',
      content: 'Comprehensive framework for waste segregation, collection, and disposal. Mandates source segregation into wet, dry, and hazardous waste. Introduces extended producer responsibility.',
      source: 'Ministry of Environment, Forest and Climate Change',
      date: '2016',
      type: 'act' as const
    },
    {
      id: '2',
      title: 'Plastic Waste Management Rules, 2016 (Amended 2021)',
      content: 'Bans single-use plastics under 75 microns. Introduces EPR for plastic producers. Sets guidelines for plastic waste collection and recycling systems.',
      source: 'Ministry of Environment',
      date: '2021',
      type: 'act' as const
    },
    {
      id: '3',
      title: 'E-Waste Management Rules, 2016',
      content: 'Guidelines for handling electronic waste. Mandates proper disposal of e-waste through authorized recyclers. Sets collection targets for manufacturers.',
      source: 'Ministry of Environment',
      date: '2016',
      type: 'act' as const
    },
    {
      id: '4',
      title: 'Construction & Demolition Waste Rules, 2016',
      content: 'Regulations for managing construction debris. Mandates segregation and proper disposal. Promotes recycling of construction materials.',
      source: 'Ministry of Environment',
      date: '2016',
      type: 'act' as const
    },
    {
      id: '5',
      title: 'Battery Management Rules, 2020',
      content: 'Guidelines for handling and recycling batteries. Sets collection targets and EPR guidelines. Promotes proper disposal of hazardous battery waste.',
      source: 'Ministry of Environment',
      date: '2020',
      type: 'act' as const
    },
    {
      id: '6',
      title: 'Biomedical Waste Rules, 2016',
      content: 'Strict guidelines for medical waste disposal. Color-coding system for different types of waste. Mandates proper treatment before disposal.',
      source: 'Ministry of Environment',
      date: '2016',
      type: 'act' as const
    }
  ];

  // Mock articles data while waiting for API
  const mockArticles: ResourceSection[] = [
    {
      id: 'a1',
      title: 'Indias Journey Towards Zero Waste',
      content: 'How Indian cities are implementing innovative waste management solutions. Success stories from Mumbai, Bengaluru, and Indore.',
      source: 'Environmental Journal',
      date: '2023',
      type: 'article' as const,
      url: 'https://example.com/india-zero-waste'
    },
    {
      id: 'a2',
      title: 'Waste Segregation Guide for Indian Households',
      content: 'Comprehensive guide on segregating waste into wet, dry, and hazardous categories. Tips for composting and reducing waste.',
      source: 'Green Living India',
      date: '2023',
      type: 'article' as const,
      url: 'https://example.com/waste-segregation'
    }
  ];

  // Mock videos data while waiting for API
  const mockVideos: ResourceSection[] = [
    {
      id: 'v1',
      title: 'Understanding Indias Waste Management Rules',
      content: 'Expert explanation of key waste management regulations and how to comply with them.',
      source: 'Environmental Education Channel',
      date: '2023',
      type: 'video' as const,
      url: 'https://youtube.com/watch?v=example1',
      thumbnail: 'https://example.com/thumbnail1.jpg'
    },
    {
      id: 'v2',
      title: 'Home Composting Tutorial in Indian Context',
      content: 'Step-by-step guide to starting composting at home using locally available materials.',
      source: 'Sustainable Living India',
      date: '2023',
      type: 'video' as const,
      url: 'https://youtube.com/watch?v=example2',
      thumbnail: 'https://example.com/thumbnail2.jpg'
    }
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      // Attempt to fetch from APIs
      const newsResponse = await axios.get(NEWS_API_URL);
      const articleData = newsResponse.data.articles.map((article: any) => ({
        id: article.url,
        title: article.title,
        content: article.description,
        source: article.source.name,
        date: new Date(article.publishedAt).toLocaleDateString(),
        type: 'article' as const,
        url: article.url
      }));
      setArticles(articleData);

      const videoResponse = await axios.get(YOUTUBE_API_URL);
      const videoData = videoResponse.data.items.map((video: any) => ({
        id: video.id.videoId,
        title: video.snippet.title,
        content: video.snippet.description,
        source: 'YouTube',
        date: new Date(video.snippet.publishedAt).toLocaleDateString(),
        type: 'video' as const,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        thumbnail: video.snippet.thumbnails.medium.url
      }));
      setVideos(videoData);
    } catch (error) {
      console.error('Error fetching resources:', error);
      // Fallback to mock data
      setArticles(mockArticles);
      setVideos(mockVideos);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = () => {
    const query = searchQuery.toLowerCase();
    switch (selectedTab) {
      case 'acts':
        return acts.filter(act => 
          act.title.toLowerCase().includes(query) || 
          act.content.toLowerCase().includes(query)
        );
      case 'articles':
        return articles.filter(article => 
          article.title.toLowerCase().includes(query) || 
          article.content.toLowerCase().includes(query)
        );
      case 'videos':
        return videos.filter(video => 
          video.title.toLowerCase().includes(query) || 
          video.content.toLowerCase().includes(query)
        );
      default:
        return [];
    }
  };

  const renderResourceItem = (item: ResourceSection) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.resourceCard}
      onPress={() => {
        if (item.type === 'act') {
          navigation.navigate('ResourceDetail', {
            ...item,
            additionalInfo: {
              keyPoints: [
                'Mandatory waste segregation at source',
                'Collection and disposal guidelines',
                'Responsibilities of waste generators',
                'Municipal authority duties'
              ],
              implementation: 'Implementation to be done in phases...',
              penalties: 'Fines up to Rs. 25,000 for non-compliance...',
              amendments: [
                'Amendment 2018: Extended producer responsibility',
                'Amendment 2020: Single-use plastic ban'
              ],
              downloadLink: 'https://example.com/download-act'
            }
          });
        } else if (item.url) {
          navigation.navigate('WebView', { url: item.url });
        }
      }}
    >
      {item.thumbnail && (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      )}
      <Text style={styles.resourceTitle}>{item.title}</Text>
      <Text style={styles.resourceContent} numberOfLines={2}>{item.content}</Text>
      <View style={styles.resourceMeta}>
        <Text style={styles.resourceSource}>{item.source}</Text>
        <Text style={styles.resourceDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#B5FFFC', '#FFDEE9']} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Resource Hub</Text>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search resources..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.tabContainer}>
          {['acts', 'articles', 'videos'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab as typeof selectedTab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : (
          <ScrollView style={styles.content}>
            {filteredContent().map(renderResourceItem)}
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
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
  searchBar: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    color: '#333',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  resourceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resourceContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resourceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceSource: {
    fontSize: 12,
    color: '#4CAF50',
  },
  resourceDate: {
    fontSize: 12,
    color: '#999',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default ResourceHub;



