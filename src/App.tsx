import React from 'react';
import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Navbar } from './pages/Navbar';
import {CreatePost} from '../src/createPost/CreatePost'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
