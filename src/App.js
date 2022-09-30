import './App.css';
import Docs from './Components/docs';
import {app, db} from "./Firebase/config";

function App() {
  return (
    <Docs db={db}/>
  );
}

export default App;
