import axios from 'axios';

const instancia = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URLPHP,
    // timeout: 5000, 
    // headers: {'Content-Type': 'application/json'}
  });

  export default instancia;