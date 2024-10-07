import instancia from '../../config/Instancia';


const UseFetchingDatos = async (api) => {

  await instancia(api)
  .then(response => {
    return (response.data);
  })
  .catch(error => {
    return error;
  })
}

export default UseFetchingDatos

// const UseFetchingDatos = (api) => {
    
//   const [loading, setLoading] = useState(true);
//   const [datos, setDatos] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const funcionFetchingDatos = async () => {
//     instancia(api)
//         .then( response => {
//             setDatos(response.data);
//             setLoading(false);
//         })
//         .catch( error => {
//             setError(error);
//         })
//         .finally(() => {
            
//         })
//     }
//     funcionFetchingDatos();
//   }, [api]);

//   return { loading, datos, error };
// };

// export default UseFetchingDatos;
