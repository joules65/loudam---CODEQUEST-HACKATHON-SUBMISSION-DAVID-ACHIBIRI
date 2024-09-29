import React from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import Constants from "expo-constants";
import DATA from "../../components/videoData";
import { VideoPlayer } from "../../components/VideoPlayer";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function VideoScreen() {
	return (
		<View style={styles.containers}>
			<StatusBar backgroundColor="dodgerblue" />

			{DATA &&
				DATA.map((data) => (
					<VideoPlayer videourl={data.videourl} no={data.id} />
				))}
		</View>
	);
}

const styles = StyleSheet.create({
	containers: {
		marginTop: Constants.statusBarHeight + 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: height,
		width: width,
	},
});