const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store the latest data
let latestMessage = ''; // Waste processing message
let latestCoordinates = { latitude: null, longitude: null }; // GPS coordinates
let latestBinFill = { wetBin: 0, dryBin: 0, metalBin: 0 };

// Endpoint to receive waste processing messages from ESP32
app.post('/update-waste', (req, res) => {
  const { message } = req.body;
  if (message) {
    latestMessage = message;
    console.log(`Received message: ${message}`);
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({ success: false, error: 'No message provided' });
  }
});

// Endpoint to receive GPS coordinates from ESP32
app.post('/update-coordinates', (req, res) => {
  const { latitude, longitude } = req.body;
  if (latitude && longitude) {
    latestCoordinates = { latitude, longitude };
    //console.log(Received coordinates: Latitude ${latitude}, Longitude ${longitude});
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({ success: false, error: 'Invalid coordinates' });
  }
});

app.post('/update-bin-fill', (req, res) => {
  const { wetBin, dryBin, metalBin } = req.body;
  latestBinFill = { wetBin, dryBin, metalBin };
  console.log('Updated bin fill levels:', latestBinFill);
  res.status(200).send({ success: true });
});

// Endpoint for React Native app to get the latest data
app.get('/latest-data', (req, res) => {
  res.status(200).json({
    message: latestMessage,
    coordinates: latestCoordinates,
    binFill: latestBinFill,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});