import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBiXTeF7oTRssMVcqAQfWieWYfytbR2gBE",
  authDomain: "foodrev-crud.firebaseapp.com",
  projectId: "foodrev-crud",
  storageBucket: "foodrev-crud.appspot.com",
  messagingSenderId: "732754792139",
  appId: "1:732754792139:web:e8265fd528c1524ae5954e",
  measurementId: "G-9QT2V8LP53",
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
