import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage} from "firebase/storage";
import { getFunctions } from 'firebase/functions';

const app = initializeApp({
  //configs
});

 const db = getFirestore(app);
 const auth = getAuth(app);
 const storage = getStorage(app);
 const functions = getFunctions(app);

export {db, auth, storage, functions};
