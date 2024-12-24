const Responder = require('../models/Responder');

// Fetch responders within a given radius
async function getNearbyResponders(location, radius = 5000) {
  return await Responder.find({
    location: {
      $nearSphere: {
        $geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
        $maxDistance: radius,
      },
    },
    status: 'available', // Only include available responders
  }).select('name phone certification location status'); // Include all relevant fields
}

module.exports = { getNearbyResponders };
