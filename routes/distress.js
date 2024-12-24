const express = require('express');
const DistressCall = require('../models/DistressCall');
const { getNearbyResponders } = require('../utils/geolocation');
const { sendNotification } = require('../utils/notification');
const router = express.Router();

// Create a distress call
router.post('/', async (req, res) => {
  try {
    const { user, location, distressType } = req.body;

    // Fetch nearby responders with full details
    const responders = await getNearbyResponders(location);

    // Create a distress call in the database
    const distressCall = new DistressCall({
      user,
      location,
      distressType,
      responders: responders.map((responder) => responder._id), // Save responder IDs
    });

    await distressCall.save();

    // Notify responders
    sendNotification(
      responders.map((r) => r.phone), // Assuming `phone` is used for notifications
      'New Distress Call',
      { location }
    );

    // Return distress call info with responders' details
    res.status(201).json({
      message: 'Distress call created successfully',
      distressCall,
      responders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
