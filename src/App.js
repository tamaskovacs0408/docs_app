import './App.css';
import Docs from './Components/docs';
import EditDocs from './Components/editDocs';
import {app, db} from "./Firebase/config";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Docs db={db}/>}/>
      <Route pat='/editDocs/:id' element={<EditDocs db={db}/>}/>
    </Routes>
  );
}

export default App;
