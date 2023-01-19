//Importamos axios para hacer la petición de la data de pokemon a su API correspondiente
import axios from "axios";

//Almaceamos en una constante la instancia de axioss creada por la funcion create() de axios, dicha funcion recibe un obj de configuración, en este caso solo contiene la prop 'baseURL' que es el path del url que se repetirá en todas nuestras requests
const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

//Exportamos la constante creada
export default pokeApi;
