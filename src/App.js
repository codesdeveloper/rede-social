import './App.css';

import Header from './Header'
import Post from './Post';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, setDoc, doc, orderBy, query } from 'firebase/firestore/lite';
import { auth, storage, db } from './firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const coll = collection(db, 'post');

  useEffect(() => {

    onAuthStateChanged(auth, (e) => {
      if(e != null)setUser(e.displayName);
    });

    (async () => {
      const d = await getDocs(query(coll, orderBy("timestamp", "desc")));
      setPosts(d.docs.map((document) => {
        return { id: document.id, info: document.data() };
      }));
    })();

  }, []);

  return (
    <div className="App">
      <Header setUser={setUser} user={user} />

      <section>

        {
         posts.map((p) => {
            return <Post user={user} info={p.info} id={p.id} />
          })
        }

      </section>
    </div>
  );
}

export default App;
