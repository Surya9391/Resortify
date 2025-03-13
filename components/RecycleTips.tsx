import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Share } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from './types';
import * as Animatable from 'react-native-animatable';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface TipData {
  id: string;
  title: string;
  text: string;
  icon: IconName;
  category: string;
  likes: number;
  details: string[];
}

const recyclingTipsData: TipData[] = [
  {
    id: '1',
    title: 'Rinse Recyclables',
    text: 'Always rinse your recyclables before putting them in the bin.',
    icon: 'water',
    category: 'General',
    likes: 0,
    details: [
      'Remove food residue to prevent contamination',
      'Let items dry before recycling',
      'No need to sterilize, just clean enough',
      'Saves energy in recycling process'
    ]
  },
  { id: '2', title: 'Separate Items', text: 'Separate paper, plastic, and glass items to make recycling easier.', icon: 'recycle', category: 'General' },
  { id: '3', title: 'No Non-Recyclables', text: 'Avoid putting non-recyclable items in the recycling bin.', icon: 'alert-circle', category: 'General' },
  { id: '4', title: 'Flatten Boxes', text: 'Flatten cardboard boxes to save space in the recycling bin.', icon: 'cube-scan', category: 'Paper' },
  { id: '5', title: 'Check Guidelines', text: 'Check local recycling guidelines to know what can and cannot be recycled.', icon: 'file-document', category: 'General' },
  { id: '6', title: 'Reuse if Possible', text: 'Reuse items whenever possible before deciding to recycle.', icon: 'recycle', category: 'General' },
  { id: '7', title: 'Electronic Waste', text: 'Dispose of electronic waste at designated e-waste collection centers.', icon: 'tablet-android', category: 'Electronics' },
  { id: '8', title: 'Compost Organics', text: 'Compost organic waste to reduce landfill and enrich soil.', icon: 'leaf', category: 'Organic' },
];

const RecyclingTips = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [expandedTips, setExpandedTips] = useState<string[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const toggleExpand = (id: string) => {
    setExpandedTips(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleLike = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const shareTip = async (title: string, text: string) => {
    try {
      await Share.share({ message: `${title}: ${text}` });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const filteredTips = recyclingTipsData.filter(tip =>
    tip.title.toLowerCase().includes(searchText.toLowerCase()) ||
    tip.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedTips = [...filteredTips].sort((a, b) => 
    (likes[b.id] || 0) - (likes[a.id] || 0)
  );

  return (
    <LinearGradient colors={['#B5FFFC', '#FFDEE9']} style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recycling Tips</Text>
      </View>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Search Tips..."
        placeholderTextColor="gray"
        value={searchText}
        onChangeText={setSearchText}
      />
      
      <ScrollView contentContainerStyle={styles.container}>
        {sortedTips.map(tip => (
          <Animatable.View key={tip.id} animation="fadeInUp" style={styles.section}>
            <TouchableOpacity onPress={() => toggleExpand(tip.id)} style={styles.sectionHeader}>
              <MaterialCommunityIcons name={tip.icon} size={30} color="green" />
              <Text style={styles.sectionTitle}>{tip.title}</Text>
              <View style={styles.rightContainer}>
                <TouchableOpacity onPress={() => handleLike(tip.id)} style={styles.likeButton}>
                  <Ionicons name="heart" size={24} color="red" />
                  <Text style={styles.likeCount}>{likes[tip.id] || 0}</Text>
                </TouchableOpacity>
                <Ionicons 
                  name={expandedTips.includes(tip.id) ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color="black" 
                />
              </View>
            </TouchableOpacity>
            {expandedTips.includes(tip.id) && (
              <View style={styles.expandedContent}>
                <Text style={styles.sectionText}>{tip.text}</Text>
                {tip.details.map((detail, index) => (
                  <Text key={index} style={styles.detailText}>• {detail}</Text>
                ))}
                <TouchableOpacity 
                  onPress={() => shareTip(tip.title, tip.text)} 
                  style={styles.shareButton}
                >
                  <Ionicons name="share-social" size={24} color="white" />
                  <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
              </View>
            )}
          </Animatable.View>
        ))}
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
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 16,
    fontSize: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
  },
  shareText: {
    color: 'white',
    marginLeft: 5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  expandedContent: {
    marginTop: 10,
    padding: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
    paddingLeft: 10,
  },
});

export default RecyclingTips;
