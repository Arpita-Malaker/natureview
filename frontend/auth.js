import { auth } from './firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// SIGNUP
window.signup = function () {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const role = document.getElementById("signup-role").value;

    if (!name || !email || !password) return alert("Please fill all fields");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem("user", JSON.stringify({ name, role, email }));
            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html";
        })
        .catch(error => alert(error.message));
};

// LOGIN
window.login = function () {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) return alert("Please fill all fields");

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            const storedUser = JSON.parse(localStorage.getItem("user")) || {};
            localStorage.setItem("user", JSON.stringify({ ...storedUser, email }));
            alert("Login successful! Redirecting...");
            window.location.href = "index.html";
        })
        .catch(error => alert(error.message));
};

// CHECK AUTH
export function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const name = storedUser?.name || user.email;
            const nameSpan = document.getElementById("userEmail");
            if (nameSpan) nameSpan.textContent = name;
        } else {
            if (!window.location.href.includes("login.html") && !window.location.href.includes("signup.html"))
                window.location.href = "login.html";
        }
    });
}

// LOGOUT
export function logout() {
    signOut(auth).then(() => window.location.href = "login.html").catch(err => alert(err.message));
}
