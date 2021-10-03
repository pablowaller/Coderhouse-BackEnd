var admin = require("firebase-admin");

var serviceAccount = require("./coder-ac5bc-firebase-adminsdk-rszv5-ae9e672eb1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coder-ac5bc.firebaseio.com',
});

console.log('Connected!')