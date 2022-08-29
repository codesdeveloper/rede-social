import './App.css';

import Header from './Header'
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
   
  }, []);

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>
    </div>
  );
}

export default App;
