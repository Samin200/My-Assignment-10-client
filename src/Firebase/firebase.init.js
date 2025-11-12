// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY3u7OdjQ42ff6SZE-T7w00b_JGAFeecE",
  authDomain: "my-assignment-10-client.firebaseapp.com",
  projectId: "my-assignment-10-client",
  storageBucket: "my-assignment-10-client.firebasestorage.app",
  messagingSenderId: "398520136763",
  appId: "1:398520136763:web:9df695c01720a2717ed81e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)