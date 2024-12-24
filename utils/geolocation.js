const Responder = require('../models/Responder');

// Fetch responders within a given radius
const getNearbyResponders = async (location, radius = 5000) => {
  return await Responder.find({
    location: {
      $nearSphere: {
        $geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
        $maxDistance: radius,
      },
    }
  });
};

const calculateDistance = (location1, location2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const [lon1, lat1] = location1.coordinates;
  const [lon2, lat2] = location2.coordinates;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
};

module.exports = {
  getNearbyResponders,
  calculateDistance,
};
