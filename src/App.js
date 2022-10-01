import './App.css';
import Docs from './Components/docs';
import Edit from './Components/Edit';
import { Routes, Route } from 'react-router-dom';
import {app, db} from "./Firebase/config";


function App() {
  return (
    <Routes>
      <Route path='/' element={<Docs db={db}/>}/>
      <Route path='/edit/:id' element={<Edit db={db}/>}/>
    </Routes>
  );
}

export default App;