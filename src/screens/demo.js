// imageMapping.js

const imageMapping = {
  Maharashtra: {
    Maharashtra: [
      // Example: Uncomment if needed and check the paths
      // require("../assets/Maharashtra/Maharashtra/1.jpeg"),
      // require("../assets/Maharashtra/Maharashtra/2.jpeg"),
    ],
  },
  Rajasthan: {
    Rajasthan: [
      // Example: Uncomment if needed and check the paths
      // require("../assets/Rajasthan/Rajasthan/1.jpeg"),
      // require("../assets/Rajasthan/Rajasthan/2.jpeg"),
    ],
    "Hawa Mahal": [
      // require("../assets/Rajasthan/Hawa Mahal/2.jpeg"),
      require("../assets/Rajasthan/Hawa Mahal/1.jpeg"),
    ],
  },
  UttarPradesh: {
    // Example: Uncomment if needed and check the paths
    // "Taj Mahal": require("../assets/UttarPradesh/TajMahalImage.jpg"),
  },
};

// Example: Get images for a specific state and place
const state = "Rajasthan"; // Set the state
const place = "Hawa Mahal"; // Set the place

// Debugging: Check if state and place exist in the object
const placeImages = imageMapping[state]?.[place];
console.log(imageMapping);

// If the placeImages is undefined or null, log an error
if (!placeImages) {
  console.error(`No images found for state: ${state} and place: ${place}`);
}
