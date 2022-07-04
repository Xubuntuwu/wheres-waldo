import './App.css';
import {initializeApp} from 'firebase/app';
import {
    // eslint-disable-next-line no-unused-vars
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc
} from 'firebase/firestore';
import { Routes, Route } from 'react-router-dom';
import Startpage from './pages/startpage';
import Gamepage from './pages/gamepage';


function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBXFYCzEEmBT6c1D3VSYJUZG2znvzh-MRc",
    authDomain: "strawberri-a9ad7.firebaseapp.com",
    projectId: "strawberri-a9ad7",
    storageBucket: "strawberri-a9ad7.appspot.com",
    messagingSenderId: "532801823736",
    appId: "1:532801823736:web:8a0ddbd7c574a53e3d6c0d"
  };
  initializeApp(firebaseConfig);
      // eslint-disable-next-line no-unused-vars
  const db = getFirestore();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Startpage/>}/>
        <Route path="/gamepage" element={<Gamepage db={db}/>}/>
      </Routes>
    </div>
  );
}

export default App;