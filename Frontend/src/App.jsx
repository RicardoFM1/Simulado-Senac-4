
import './App.css'
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router"
import Login from './Pages/Login/login';


function App() {


  return (
    
    <BrowserRouter>
      <Routes>
      <Route path={'/login'} element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
