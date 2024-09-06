import React from 'react'
import { BrowserRouter, Route, Routes, Navigate, createBrowserRouter } from 'react-router-dom'

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
            <Route path="motivos" element={<MotivosVisita />} />
            <Route path="profesiones" element={<Profesiones />} />
            <Route path="clientes" element={<Clientes />} />

            <Route path="motivos/modificar/:id" element={<FormularioMotivosVisita />} />
            <Route path="motivos/crear" element={<FormularioMotivosVisita />} />

            <Route path="profesiones/modificar/:id" element={<FormularioProfesiones />} />
            <Route path="profesiones/crear" element={<FormularioProfesiones />} />
            
            <Route path="clientes/modificar/:id" element={<FormularioClientes />} />
            <Route path="clientes/crear" element={<FormularioClientes />} />

            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


















































// import React from 'react';  // Importa React desde la biblioteca 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Importa BrowserRouter, Route y Routes desde 'react-router-dom'

// import Clientes from './pages/Clientes';  // Importa el componente Clientes desde './pages/Clientes'
// import Profesiones from './pages/Profesiones';  // Importa el componente Profesiones desde './pages/Profesiones'
// import Principal from "./layouts/Principal";  // Importa el componente Principal desde './layouts/Principal'
// import MotivosVisita from './pages/MotivosVisita';  // Importa el componente MotivosVisita desde './pages/MotivosVisita'
// import FormularioMotivosVisita from './pages/FormularioMotivosVisita';  // Importa el componente FormularioMotivosVisita desde './pages/FormularioMotivosVisita'

// const App = () => {  // Define el componente funcional App
//   return (
//     <BrowserRouter>  // Envuelve la aplicación en BrowserRouter para el enrutamiento
//       <Routes>  // Definición de rutas anidadas dentro de Routes
//         <Route path="/" element={<Principal />}>  // Ruta raíz que renderiza el componente Principal
//           <Route path="motivos" element={<MotivosVisita />} />  // Cuando el URL es "motivos" renderiza el componente "MotivosVisita"
//           <Route path="clientes" element={<Clientes />} />  // Cuando el URL es "clientes" renderiza el componente "Clientes"
//           <Route path="profesiones" element={<Profesiones />} />  // Cuando el URL es "profesiones" renderiza el componente "Profesiones"

//           <Route path="motivos/modificar/:id" element={<FormularioMotivosVisita />} />  // Ruta para modificar motivos con un parámetro ':id' que renderiza "FormularioMotivosVisita"
//           <Route path="motivos/crear" element={<FormularioMotivosVisita />} />  // Cuando el URL es "crear" renderiza el componente "FormularioMotivosVisita"
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;  // Exporta el componente App por defecto para que pueda ser utilizado en otras partes de la aplicación













