import { useEffect, useState } from 'react'

const Prueba = () => {

    const [activado, setActivado] = useState(false);
    const [coordenadas, setCoordenadas] = useState({x: 0, y: 0})

    useEffect(() => {
      
      const handleMove = (e) => {
        const {clientX, clientY} = e;
        setCoordenadas({x:clientX, y:clientY});
        
      }
      if(activado){
        window.addEventListener("pointermove", handleMove);
      }
      return () => {
        window.removeEventListener("pointermove", handleMove);
      }
    }, [activado])


  return (
    <main>
      <div style={{
        position: "absolute",
        border: "4px solid black",
        borderRadius: "50%",
        opacity: "0.8",
        pointerEvents: "none",
        left: -25,
        top: -25,
        width: 40,
        height: 40,
        transform: `translate(${coordenadas.x}px, ${coordenadas.y}px)`,
      }}>
      </div>

      <button onClick={() => setActivado(!activado)}>
          {activado ? "Desactivar" : !activado ? "Activar" : ""} botón
      </button>
    </main>
  )
}

export default Prueba