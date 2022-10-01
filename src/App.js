import './App.css';
import Docs from './Components/docs';
import Edit from './Components/Edit';
import {app, db} from "./Firebase/config";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Docs db={db}/>}/>
      <Route pat='/edit/:id' element={<Edit db={db}/>}/>
    </Routes>
  );
}

export default App;
