const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendNotification(tokens, title, data) {
  const message = {
    notification: { title },
    data,
    tokens,
  };

  admin.messaging().sendMulticast(message)
    .then((response) => console.log('Notifications sent:', response.successCount))
    .catch((error) => console.error('Notification error:', error));
}

module.exports = { sendNotification };
