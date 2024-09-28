import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, View, } from '@/src/components/Themed';
import { tracks } from '@/assets/data/tracks';
import TrackListItem from '@/src/components/TrackListItem';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query getFavorites($userId: String!) {
  favoritesByUserid(userid: $userId) {
    id
    trackid
    userid
    track {
      id
      name
      preview_url
      artists {
        id
        name
      }
      album {
        id
        name
        images {
          height
          url
          width
        }
      }
    }
  }
}
`;

export default function FavoritesScreen() {
  const {data, loading, error} = useQuery(query, {variables: {userId: 'neon_db'},
  });

  if(loading) {
    return <ActivityIndicator />;
  }


  
  return (
      <FlatList 
        data={tracks} 
        renderItem={({ item }) => <TrackListItem track={item}/> }
        showsVerticalScrollIndicator={false}
      />
  );
}
