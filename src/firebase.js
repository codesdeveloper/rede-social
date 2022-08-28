import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage} from "firebase/storage";
import { getFunctions } from 'firebase/functions';

const app = initializeApp({
  apiKey: "AIzaSyAWxrQ8_vdoCevVk_19qvNoaxzbb-hZ8FA",
  authDomain: "instagram-clone-v8.firebaseapp.com",
  projectId: "instagram-clone-v8",
  storageBucket: "instagram-clone-v8.appspot.com",
  messagingSenderId: "806214029694",
  appId: "1:806214029694:web:35b770b5817974c64da32f",
  measurementId: "G-8MQVBQMT53"
});

 const db = getFirestore(app);
 const auth = getAuth(app);
 const storage = getStorage(app);
 const functions = getFunctions(app);

export {db, auth, storage, functions};
