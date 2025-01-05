import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { getStates } from "../services/placesService";
import { HeartIcon, ChevronRightIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const StatesGrid = () => {
  const [states, setStates] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  const toggleFavorite = (stateName) => {
    setFavorites((prev) =>
      prev.includes(stateName)
        ? prev.filter((name) => name !== stateName)
        : [...prev, stateName]
    );
  };

  const renderStateCard = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("PlacesGrid", { stateName: item.name })
      }
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.name)}>
          <HeartIcon
            size={24}
            color={favorites.includes(item.name) ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView>
        <Text style={styles.heading}>States of India</Text>
        <FlatList
          data={states}
          renderItem={renderStateCard}
          numColumns={2}
          keyExtractor={(item) => item.name}
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(3),
  },
  cardTitle: {
    fontSize: wp(4.5),
    fontWeight: "600",
    color: "#343a40",
  },
});

export default StatesGrid;
