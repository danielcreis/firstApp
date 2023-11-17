import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZugb69Ocg5z3pFcXCBGBcbfkhA-glloU",
  authDomain: "gerador-fe770.firebaseapp.com",
  projectId: "gerador-fe770",
  storageBucket: "gerador-fe770.appspot.com",
  messagingSenderId: "973001748036",
  appId: "1:973001748036:web:9a24b45983cb34ec715611"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db, doc, deleteDoc };