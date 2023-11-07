import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD_Gj2LJjRLEt2ObfwzdYlD6nNNhpECwaM",
  authDomain: "react-9cc19.firebaseapp.com",
  projectId: "react-9cc19",
  storageBucket: "react-9cc19.appspot.com",
  messagingSenderId: "239916890750",
  appId: "1:239916890750:web:791a28f22c9d926e6cb62f",
  measurementId: "G-Z663J86WN5",
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const myAuthentication = getAuth(app);

const usersCollection = collection(database, "users");
const blogsCollection = collection(database, "blogs");
const commentCollection = collection(database, "comments");
const replyCollection = collection(database, "reply");
const storage = getStorage();

export {
  myAuthentication,
  usersCollection,
  blogsCollection,
  commentCollection,
  replyCollection,
  storage,
};
