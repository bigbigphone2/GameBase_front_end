import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddGame from "./pages/AddGame";
import Game from "./pages/Game";
import LogIn from "./pages/Account/LogIn";
import Profile from "./pages/Profile";
import Personal from "./pages/Personal";
import EditGame from "./pages/EditGame";
function App() {
  return (
    <Router>
      <Navbar/>
           
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<AddGame/>} />
        <Route path='/logIN' element={<LogIn/>}/>
        <Route path='/game/:id' element={<Game/>} />
        <Route path='/user/:id' element={<Profile/>}/>
        <Route path='/personal' element={<Personal/>}/>
        <Route path='/edit/:id' element={<EditGame/>}/>
      </Routes>
    </Router>
  );
}

export default App;
