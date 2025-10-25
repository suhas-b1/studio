// This file holds the configuration for your Firebase project.
// You need to replace the placeholder values below with the actual values from your own Firebase project.

// HOW TO GET YOUR FIREBASE CONFIG:
// 1. Go to the Firebase Console: https://console.firebase.google.com/
// 2. Create a new project or select an existing one.
// 3. Go to Project Settings (click the gear icon ⚙️ next to "Project Overview").
// 4. In the "General" tab, scroll down to the "Your apps" section.
// 5. If you don't have a web app, create one by clicking the web icon (</>).
// 6. For your web app, find the "SDK setup and configuration" section and select "Config".
// 7. You will see an object that looks like this:
//    const firebaseConfig = {
//      apiKey: "AIza...",
//      authDomain: "your-project-id.firebaseapp.com",
//      ...
//    };
// 8. Copy the values from that object and paste them into the corresponding fields below.

export const firebaseConfig = {
  // Replace "YOUR_API_KEY_HERE" with the apiKey value from your Firebase project.
  apiKey: "YOUR_API_KEY_HERE",

  // Replace "YOUR_PROJECT_ID.firebaseapp.com" with the authDomain value.
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",

  // Replace "YOUR_PROJECT_ID_HERE" with the projectId value.
  projectId: "YOUR_PROJECT_ID_HERE",

  // Replace "YOUR_PROJECT_ID.appspot.com" with the storageBucket value.
  storageBucket: "YOUR_PROJECT_ID.appspot.com",

  // Replace "YOUR_MESSAGING_SENDER_ID_HERE" with the messagingSenderId value.
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",

  // Replace "YOUR_APP_ID_HERE" with the appId value.
  appId: "YOUR_APP_ID_HERE",

  // This is optional and can sometimes be left blank, but it's best to include it.
  measurementId: "YOUR_MEASUREMENT_ID_HERE"
};
