import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import "./index.css"

import Clientes from './pages/Clientes'
import Profesiones from './pages/Profesiones'
import Principal from "./layouts/Principal"
import MotivosVisita from './pages/MotivosVisita'
import FormularioMotivosVisita from './pages/FormularioMotivosVisita'
import FormularioProfesiones from './pages/FormularioProfesiones'
import FormularioClientes from './pages/FormularioClientes'

const App = () => {
  return (
    
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Principal />}>
            
              <Route path="clientes" element={<Clientes />} />
              <Route path="motivos" element={<MotivosVisita />} />
              <Route path="profesiones" element={<Profesiones />} />
              
              <Route path="clientes/modificar/:id" element={<FormularioClientes />} />
              <Route path="clientes/crear" element={<FormularioClientes />} />

              <Route path="motivos/modificar/:id" element={<FormularioMotivosVisita />} />
              <Route path="motivos/crear" element={<FormularioMotivosVisita />} />

              <Route path="profesiones/modificar/:id" element={<FormularioProfesiones />} />
              <Route path="profesiones/crear" element={<FormularioProfesiones />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
      </BrowserRouter>

  )
}

export default App
