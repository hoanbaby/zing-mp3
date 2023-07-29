import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyAe2IUOUKB6UnbAa45JZkP3psHe0zKTpv",
   authDomain: "d4tmp3-reactjs-7195d.firebaseapp.co",
   projectId: "d4tmp3-reactjs-7195d",
   storageBucket: "d4tmp3-reactjs-7195d.appspot.co",
   messagingSenderId: "27832445908",
   appId: "1:278324459087:web:cd5aa4d5f1fccd2e149c3",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const database = getFirestore(app)
export const auth = getAuth(app)
