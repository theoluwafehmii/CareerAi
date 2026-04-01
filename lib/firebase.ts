import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // During build time or if environment variables are missing, we use a placeholder
    // to prevent the SDK from throwing an "invalid-api-key" error during initialization.
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy_MISSING_API_KEY",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && typeof window !== "undefined") {
    console.warn(
        "Firebase API Key is missing. Please set NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file."
    );
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
