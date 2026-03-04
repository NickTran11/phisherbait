import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhUzDkvbcfp751T9hgvbzN2ZaAOZOxDG0",
  authDomain: "masterbait-b571c.firebaseapp.com",
  projectId: "masterbait-b571c",
  storageBucket: "masterbait-b571c.firebasestorage.app",
  messagingSenderId: "4078870670",
  appId: "1:4078870670:web:529f2701c2d27b2ca2e9df"
};

let app;
let auth;

if (firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
} else {
  console.warn("Firebase API key is missing. Authentication will not work.");
}

export { auth };
