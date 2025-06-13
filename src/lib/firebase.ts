// src/lib/firebase.ts
// IMPORTANT: REPLACE WITH YOUR ACTUAL FIREBASE CONFIGURATION
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage'; // Import Firebase Storage

// Replace with your Firebase project's configuration
// Ensure 'storageBucket' is correctly filled for profile picture uploads.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE", // CRITICAL for image uploads
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE",
  measurementId: "YOUR_MEASUREMENT_ID_HERE" // Optional
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app); // Initialize Firebase Storage
// import { getFirestore, type Firestore } from 'firebase/firestore'; // Uncomment if you use Firestore
// const db: Firestore = getFirestore(app); // Uncomment if you use Firestore

export { app, auth, storage /*, db */ };
