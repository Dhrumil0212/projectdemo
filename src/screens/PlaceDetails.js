import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import MapView, { Marker } from "react-native-maps";
import { getPlaceByName } from "../services/placesService";
import { imageMapping } from "../config/imageMapping";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlaceDetails = ({ route }) => {
  const { placeName, stateName } = route.params;
  const [place, setPlace] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPlaceByName(placeName)
      .then((placeData) => {
        setPlace(placeData);
        loadImages(stateName, placeName);
      })
      .catch(() => setPlace({ error: true }));
  }, [placeName, stateName]);

  const loadImages = (state, place) => {
    const stateImages = imageMapping[state];
    const placeImages = stateImages ? stateImages[place] : [];
    setImages(placeImages || []);
  };

  if (!place) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#343a40" />
        <Text style={styles.loadingText}>Loading place details...</Text>
      </View>
    );
  }

  if (place.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load place details. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {images.length > 0 && (
        <SliderBox
          images={images}
          sliderBoxHeight={hp(30)}
          dotColor="#343a40"
          inactiveDotColor="#ccc"
          autoplay
          circleLoop
          resizeMode="cover"
        />
      )}

      <Text style={styles.heading}>{place.name}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{place.address}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>{place.contact}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Historical Info:</Text>
          <Text style={styles.value}>{place.historical_info}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Tourism Info:</Text>
          <Text style={styles.value}>{place.tourism_info}</Text>
        </View>
      </View>

      {place.location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: place.location.latitude,
            longitude: place.location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: place.location.latitude,
              longitude: place.location.longitude,
            }}
            title={place.name}
            description={place.address}
          />
        </MapView>
      )}
    </ScrollView>
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
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: wp(2),
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: hp(1.5),
  },
  label: {
    fontWeight: "bold",
    fontSize: wp(4),
    color: "#343a40",
    width: "30%",
  },
  value: {
    fontSize: wp(4),
    color: "#495057",
    width: "70%",
  },
  map: {
    height: hp(30),
    marginVertical: hp(2),
    borderRadius: wp(3),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    textAlign: "center",
    fontSize: wp(5),
    marginTop: hp(1),
    color: "#6c757d",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  errorText: {
    textAlign: "center",
    fontSize: wp(5),
    color: "#dc3545",
  },
});

export default PlaceDetails;
