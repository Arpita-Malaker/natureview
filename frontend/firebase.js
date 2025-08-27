// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuhPOR3jIW-oFBJ7RCzozMZc7LbcoUKHM",
    authDomain: "natureview-37fde.firebaseapp.com",
    projectId: "natureview-37fde",
    storageBucket: "natureview-37fde.firebasestorage.app",
    messagingSenderId: "1047801333980",
    appId: "1:1047801333980:web:75de2fdb6bf3c2f6ca4c19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Export for other scripts
export { app, auth, storage };
