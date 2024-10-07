import { createContext, useState } from 'react'

export const GlobalContext = createContext();

export function GlobalStateProvider ({children}) {

  const [rowSeleccionada, setRowSeleccionada] = useState({
    clientes:{},
    motivos:{},
    profesiones:{},
  });

return(
  <GlobalContext.Provider value={{ rowSeleccionada, setRowSeleccionada }}>
    {children}
  </GlobalContext.Provider>
)

}

// Context o
// Zustan o
// Redux