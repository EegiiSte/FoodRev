import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const myAuthentication = getAuth(app);

const usersCollection = collection(database, "users");
const blogsCollection = collection(database, "blogs");
const commentCollection = collection(database, "comments");
const replyCollection = collection(database, "reply");
const contactCollection = collection(database, "contact");
const adminCollection = collection(database, "admin");
const storage = getStorage();
// const starsCollection = collection(database, "blogs", blogsCollection, "Stars");

export {
  adminCollection,
  database,
  myAuthentication,
  usersCollection,
  blogsCollection,
  commentCollection,
  replyCollection,
  contactCollection,
  storage,
  // starsCollection,
};
