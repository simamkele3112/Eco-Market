import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn6-vJjxuiYMGpnIS_5N-5eEaG1s1v4xY",
  authDomain: "eco-market-5b6d8.firebaseapp.com",
  projectId: "eco-market-5b6d8",
  storageBucket: "eco-market-5b6d8.firebasestorage.app",
  messagingSenderId: "526552784798",
  appId: "1:526552784798:web:e6619afa5cd3ececd92008f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };

