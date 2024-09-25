import { StyleSheet, FlatList } from 'react-native';
import { Text, View, } from 'react-native';
import { tracks } from '@/assets/data/tracks';
import TrackListItem from '@/src/components/TrackListItem';
import Player from '@/src/components/Player';

export default function HomeScreen() {
  return (
      <FlatList 
        data={tracks} 
        renderItem={({ item }) => <TrackListItem track={item}/> }
        showsVerticalScrollIndicator={false}
      />
  );
}
