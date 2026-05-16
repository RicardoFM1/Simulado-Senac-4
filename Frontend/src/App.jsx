import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router"
import Login from './Pages/Login/login';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home/home';
import { useEffect, useState, useCallback } from 'react';
import Api from './Services/api';

// Wrapper component to handle auth logic with access to location
function AppContent() {
  const [show, setShow] = useState(true)
  const [telaAtiva, setTelaAtiva] = useState('convidados')
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  const buscarUsuario = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const res = await Api.get('/retrieve')
        setUsuario(res.data.dados)

        // Only set default screen if we just fetched a new user and current screen is default
        if (res.data.dados.cargo_usuario === 'admin' && telaAtiva === 'convidados') {
          setTelaAtiva('dashboard')
        }
      } catch (err) {
        console.error("Erro ao buscar usuário", err)
        localStorage.removeItem('token')
        setUsuario(null)
      }
    } else {
      setUsuario(null)
    }
    setLoading(false)
  }, [telaAtiva])

  useEffect(() => {
    buscarUsuario()
  }, []) // Initial load

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100">Carregando...</div>

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      <Routes>
        <Route path='/login' element={<Login onLoginSuccess={buscarUsuario} />} />
        <Route
          path='/'
          element={
            localStorage.getItem('token') ? (
              <Home
                usuario={usuario}
                telaAtiva={telaAtiva}
                setTelaAtiva={setTelaAtiva}
                show={show}
                setShow={setShow}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
