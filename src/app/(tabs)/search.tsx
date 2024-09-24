import { StyleSheet, FlatList, TextInput } from 'react-native';
import { Text, View, } from '@/src/components/Themed';
import { tracks } from '@/assets/data/tracks';
import TrackListItem from '@/src/components/TrackListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

export default function SearchScreen() {
  const [search, setSearch]= useState('Default value');
  return (
      <SafeAreaView>
        <View style={styles.header}>
          {/* Header */}
          <FontAwesome name="search" size={16} color="lightblue" />
          <TextInput 
          value={search}
          onChangeText={setSearch}
          placeholder="What's gingering your ears today?"
          style={styles.input}
          />
          <Text onPress={() => setSearch('')} style={{ color: 'white' }}>Cancel</Text>
        </View>
        <FlatList 
          data={tracks} 
          renderItem={({ item }) => <TrackListItem track={item}/> }
          showsVerticalScrollIndicator={false}
      />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#121314',
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    color: 'white',
  },
});