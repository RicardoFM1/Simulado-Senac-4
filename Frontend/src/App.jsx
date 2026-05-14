
import './App.css'
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router"
import Login from './Pages/Login/login';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home/home';
import { useState } from 'react';

function App() {
const [show, setShow] = useState(false)
const [telaAtiva, setTelaAtiva] = useState('dashboard')

  return (
    <>
    <ToastContainer position='top-right' autoClose={3000}/>
    <BrowserRouter>
      <Routes>
      <Route path={'/login'} element={<Login />}/>
      <Route path={'/'} element={<Home telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} show={show} setShow={setShow}/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
