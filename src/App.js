import './App.css';

import Header from './Header'
import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, storage, db } from './firebase.js';

function App() {

  const [user, setUser] = useState();
  const [post, setPost] = useState([]);

  useEffect(() => {/*
    const unsub = onSnapshot(doc(db, "post", "st"), (doc) => {
      console.log("Current data: ", doc.data());
  });*/



  }, []);

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>

      <div className='postSingle'>
        <img src='https://cursos.dankicode.com/og-img.jpg' />
        <p>
          <b>Usurario Nome: </b>
          Usurario Nome
        </p>
        <form>
          <textarea></textarea>
          <input type='submit' value='Comentar!'/>
        </form>
      </div>


    </div>
  );
}

export default App;
