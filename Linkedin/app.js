// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBX6VTyXotjYvTggRCAWfb-pcJt62qNeYQ",
    authDomain: "parprofilio.firebaseapp.com",
    projectId: "parprofilio",
    storageBucket: "parprofilio.appspot.com",
    messagingSenderId: "29188506325",
    appId: "1:29188506325:web:b8e8357369b0465d16585c",
    measurementId: "G-E1TNGFEG08"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const profileDiv = document.getElementById('profile');
const profilePic = document.getElementById('profile-pic');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');

// Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();

// Login event
loginBtn.addEventListener('click', () => {
    auth.signInWithPopup(provider).then(result => {
        const user = result.user;
        displayProfile(user);
    }).catch(error => {
        console.error("Error during sign-in:", error);
    });
});

// Logout event
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        profileDiv.style.display = 'none';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'block';
    }).catch(error => {
        console.error("Error during sign-out:", error);
    });
});

// Display profile
const displayProfile = (user) => {
    profilePic.src = user.photoURL;
    profileName.textContent = `${user.displayName}`;
    profileEmail.textContent = `Email: ${user.email}`;
    
    profileDiv.style.display = 'block';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
};

// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        displayProfile(user);
    } else {
        profileDiv.style.display = 'none';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'block';
    }
});
