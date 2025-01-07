// // imageMapping.js
// export const imageMapping = {
//   Maharashtra: {
//     Maharashtra: [
//       // require("../assets/Maharashtra/Maharashtra/1.jpeg"),
//       // require("../assets/Maharashtra/Maharashtra/2.jpeg"),
//     ],
//   },
//   Rajasthan: {
//     Rajasthan: [
//       // require("../assets/Rajasthan/Rajasthan/1.jpeg"),
//       // require("../assets/Rajasthan/Rajasthan/2.jpeg"),
//     ],
//     "Hawa Mahal": [
//       // require("../../assets/Rajasthan/Hawa Mahal/1.jpeg"),
//       // require("../..assets/Rajasthan/Hawa Mahal/2.jpeg"),
//       // require("..assets\\Rajasthan\\Hawa Mahal\\1.jpeg"),
//       require("../assets/Rajasthan/Hawa Mahal/2.jpeg"),
//       require("../assets/Rajasthan/Hawa Mahal/1.jpeg"),
//     ],
//   },
// };

// // Other states and places
export const imageMapping = {
  Rajasthan: {
    "Hawa Mahal": [
      require("../assets/Rajasthan/Hawa Mahal/1.jpeg"), // Relative path from config to assets
      require("../assets/Rajasthan/Hawa Mahal/2.jpeg"),
    ],
    // require("../assets/Rajasthan/Hawa_Mahal/2.jpeg"), // Static import
    // Add other places and their images here
  },
  UttarPradesh: {
    // "Taj Mahal": require("../assets/UttarPradesh/TajMahalImage.jpg"),
    // Add other places and their images here
  },
  // Add more states and their respective images as needed
};
