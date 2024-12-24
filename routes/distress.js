const express = require('express');
const DistressCall = require('../models/DistressCall');
const { getNearbyResponders } = require('../utils/geolocation');
const { sendNotification } = require('../utils/notification');
const router = express.Router();

// Create a distress call
router.post('/', async (req, res) => {
  try {
    // Create a distress call in the database
    const distressCall = new DistressCall({...req.body});
    
    const savedDistressCall = await distressCall.save();
    
    // Fetch nearby responders with full details
    const responders = await getNearbyResponders(savedDistressCall.location);
    
    // Calculate distances
    const responderTokens = responders.map((r) => r.token);
    const distances = responders.map((r) => calculateDistance(savedDistressCall.location, r.location));
    
    // Notify responders
    sendNotification(
      responderTokens,
      'New Distress Call',
      distances
    );

    // Return distress call info with responders' details
    res.status(201).json({
      message: 'Distress call created successfully',
      distressCall,
      responders: responders.map((r, index) => ({ ...r, distance: distances[index] })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
