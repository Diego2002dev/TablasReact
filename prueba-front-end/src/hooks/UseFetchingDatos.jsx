import { useEffect, useState } from 'react';
import instancia from '../../config/Instancia';

const UseFetchingDatos = (api) => {
    
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const funcionFetchingDatos = async () => {
    instancia(api)
        .then( response => {
            setDatos(response.data);
            setLoading(false);
        })
        .catch( error => {
            setError(error);
        })
        .finally(() => {
            
        })
    }
    funcionFetchingDatos();
  }, [api]);

  return { loading, datos, error };
};

export default UseFetchingDatos;






































// export const fetchingDatos = async (api) => {
//     await instancia(api)
//     .then ( response => {
//       setProfesiones(response.data);

//     })
//     .catch ( error => {
//       console.log(`ERROR.CATCH: ${error}`);
//     })
//     .finally(() => {
//       setLoading(false);
//     })
//   }

//   useEffect(() => {
//     fetchingDatos();
//   }, [])