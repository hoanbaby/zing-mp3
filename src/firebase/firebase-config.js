import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiX_kaPA_zuyTtPJT8btGsl3",
  authDomain: "cozymusic-d215e.firebaseapp.com",
  projectId: "cozymusic-d215e",
  storageBucket: "cozymusic-d215e.appspot.com",
  messagingSenderId: "1023739966310",
  appId: "1:1023739966310:web:7d2fd06d49a23ba5104ea7",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const database = getFirestore(app)
export const auth = getAuth(app)
