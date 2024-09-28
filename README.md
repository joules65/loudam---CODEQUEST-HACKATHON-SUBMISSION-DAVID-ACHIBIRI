LoudAM is a music streaming app that uses the Spotify for developers api documentation to pull and fetch preview music which runs on the expo app.

To Use the App on your device scan this qr Code:
![EXPOGO](https://github.com/user-attachments/assets/2673bb93-6ef6-4d92-bf57-a77836766fed)
or use this link: https://expo.dev/preview/update?message=DONE&updateRuntimeVersion=1.0.0&createdAt=2024-09-28T18%3A44%3A43.581Z&slug=exp&projectId=d34cf299-c5bd-4e3b-9eaa-a79f0d825c58&group=dce5295d-b42f-4f00-bc2e-8d45ed47f368
https://github.com/user-attachments/assets/5d8db444-c8f1-439b-a43b-230858768b91




Player Component Documentation

Overview

The Player component is part of a music streaming application built using React Native. It allows users to play audio tracks, manage favorites, and provides a user interface for playback controls. The component utilizes the Expo AV library for audio playback and Apollo Client for managing GraphQL queries and mutations related to user favorites.

Features

Play and pause audio tracks.

Add or remove tracks from favorites.

Display track information including title, artist, and album artwork.

Update UI based on playback status.

Dependencies

react-native: For building the mobile application.

expo-av: For audio playback functionality.

@apollo/client: For GraphQL data management.

@expo/vector-icons: For iconography.

GraphQL Queries and Mutations

Insert Favorite Mutation

mutation MyMutation($userId: String!, $trackId: String!) {
  insertFavorites(userid: $userId, trackid: $trackId) {
    id
    trackid
    userid
  }
}


Parameters:

userId: The ID of the user.

trackId: The ID of the track to be added to favorites.

Returns: The ID, track ID, and user ID of the newly inserted favorite.

Remove Favorite Mutation

mutation MyMutation($trackId: String!, $userId: String!) {
  deleteFavorites(trackid: $trackId, userid: $userId) {
    id
  }
}


Parameters:

trackId: The ID of the track to be removed from favorites.

userId: The ID of the user.

Returns: The ID of the deleted favorite.

Is Favorite Query

query MyQuery($trackId: String!, $userId: String!) {
  favoritesByTrackidAndUserid(trackid: $trackId, userid: $userId) {
    id
    trackid
    userid
  }
}


Parameters:

trackId: The ID of the track.

userId: The ID of the user.

Returns: An array of favorites matching the provided track ID and user ID.

Component Structure

Player Component

const Player = () => {
  // State variables
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { track } = usePlayerContext();

  // GraphQL mutations
  const [insertFavorite] = useMutation(insertFavoriteMutation);
  const [removeFavorite] = useMutation(removeFavoriteMutation);

  // Query to check if the track is a favorite
  const { data, refetch } = useQuery(isFavoriteQuery, {
    variables: { userId: 'vadim', trackId: track?.id || '' },
  });
  const isLiked = data?.favoritesByTrackidAndUserid?.length > 0;

  // Effect to play track when it changes
  useEffect(() => {
    playTrack();
  }, [track]);

  // Effect to unload sound when component unmounts
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Function to play the selected track
  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    if (!track?.preview_url) {
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });

    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
  };

  // Function to handle playback status updates
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    setIsPlaying(status.isPlaying);
  };

  // Function to toggle play/pause
  const onPlayPause = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  // Function to like/unlike a track
  const onLike = async () => {
    if (!track) return;
    if (isLiked) {
      await removeFavorite({
        variables: { userId: 'vadim', trackId: track.id },
      });
    } else {
      await insertFavorite({
        variables: { userId: 'vadim', trackId: track.id },
      });
    }
    refetch();
  };

  // Render nothing if no track is available
  if (!track) {
    return null;
  }

  const image = track.album.images?.[0];

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {image && <Image source={{ uri: image.url }} style={styles.image} />}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
        </View>
        <Ionicons
          onPress={onLike}
          name={isLiked ? 'heart' : 'heart-outline'}
          size={20}
          color={'white'}
          style={{ marginHorizontal: 10 }}
        />
        <Ionicons
          onPress={onPlayPause}
          disabled={!track?.preview_url}
          name={isPlaying ? 'pause' : 'play'}
          size={22}
          color={track?.preview_url ? 'white' : 'gold'}
        />
      </View>
    </View>
  );
};


Styles

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -75,
    width: '100%',
    height: 75,
    padding: 10,
  },
  player: {
    backgroundColor: '#85C7F2',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: 'white',
  },
  subtitle: {
    color: 'pink',
    fontSize: 12,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});


Usage

To use the Player component, ensure that it is wrapped within a context provider that supplies the current track information via usePlayerContext. The component will automatically handle audio playback and favorite management based on user interactions.

Setup Instructions

Install the required dependencies:

npm install react-native expo-av @apollo/client @expo/vector-icons


Ensure that your GraphQL server is running and accessible.

Import and use the Player component in your application.

Challenges

Importing Stepzen in the terminal failed often. This was resolved by importing them manually in the files.

Coming Features

Lyric Statcard

Time duration for songs shown

Video Playback
