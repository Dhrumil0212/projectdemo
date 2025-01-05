import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { getPlacesByState } from "../services/placesService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlacesGrid = ({ route }) => {
  const { stateName } = route.params;
  const [places, setPlaces] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getPlacesByState(stateName).then(setPlaces);
  }, [stateName]);

  const renderPlaceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("PlaceDetails", { placeName: item.name })
      }
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView>
        <Text style={styles.heading}>{stateName} Places</Text>
        <FlatList
          data={places}
          renderItem={renderPlaceCard}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: wp(4),
  },
  heading: {
    fontSize: wp(6),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: hp(2),
    color: "#343a40",
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: wp(3),
    margin: wp(2),
    width: wp(42),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: wp(2),
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: hp(20),
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: wp(3),
  },
  cardTitle: {
    fontSize: wp(4.5),
    fontWeight: "600",
    color: "#343a40",
  },
});

export default PlacesGrid;
