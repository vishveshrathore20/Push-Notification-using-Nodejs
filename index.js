// Import necessary modules
const express = require("express");
const admin = require("firebase-admin");

// Initialize the Express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Import Firebase service account key and initialize the Firebase Admin SDK
const serviceAccount = require("./flutter-project-f72d6-firebase-adminsdk-jvz6n-eb09daa8c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flutter-project-f72d6-default-rtdb.firebaseio.com/",
});

// Get a reference to the Firebase Cloud Messaging service
const messaging = admin.messaging();

// Define a route to send notifications
// Define a route to send notifications

app.post("/send", (req, res) => {
  const title = req.body.title; // Get the notification title from the request body
  const body = req.body.body; // Get the notification body from the request body
  const data = req.body.data || {}; // Get additional data from the request body

  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: data,
    topic: "news",
  };

  // Send a message to all devices subscribed to the "news" topic
  messaging
    .send(message)
    .then((response) => {
      console.log("Message sent successfully:", response);
      res.status(200).send("Message sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending message");
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
