//Funcion que se encarga de introducir un pokemon en el array de pokemons favoritos o lo saca de este
const toggleFavorite = (id: number) => {
  //Almacenamos en una variable el array de pokemons favoritos obtenido desde el localstorage | Si no hubiese nada en el localstorage, la variable contendría un array vacío
  //La funcion getItem() devuelve un JSON, asi que debemos parsearlo con la funcion parse() -> Converts a JavaScript Object Notation (JSON) string into an object
  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  //Buscamos en el array de favoritos, si el id del pokemon ya existe (si el array incluye el id recibido)
  if (favorites.includes(id)) {
    //Rellenamos de nueveo la variable con otro array, dicho array contendrá todos los elementos que NO coincidan con el id del pokemon recibido, esto hará que dicho pokemon deje de star en el array de favoritos
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    //Si no lo incluye, lo pusheamos
    favorites.push(id);
  }

  //Actualizamos el objeto 'favorites' del localstorage | El localstorage solo acepta objetos JSON, así que debemos convertirlo con la función stringify() -> Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

//Función que comprueba si el id recibido es un id de un pokemon que ya exista en el array de pokemons favoritos
const existInFavorites = (id: number): boolean => {
  //Comprobamos si el objeto window existe, esto nos indicará si la función esta siendo llamada desde el lado del cliente o del servidor | En caso de estar siendo llamada desde el servidor, retornará siempre false
  //Esto debe hacerse así porque hacemos uso del localstorage para almacenar a nuestros pokemon favoritos, y el localstorage no es accesible desde el lado del servidor
  if (typeof window === "undefined") return false;

  //En este caso es una constante porque no necesitamos modificar su valor más tarde
  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  //Retornamos el booleano producto de la comprobocación de si el id del pokemon recibido estaá incluido o no en el array de pokemons favoritos
  return favorites.includes(id);
};

//No usamos lo del typeof window porque esta función de 'pokemons' solo será llamada desde un useEffect, y el useEffect se ejecuta en el lado del cliente
const pokemons = (): number[] => {
  //Retornamos el item 'favorites' encontrado en nuestro localstorage con la función parse() la cual -> Converts a JavaScript Object Notation (JSON) string into an object.
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

//Exportamos nuestras funciones creadas
export default {
  existInFavorites,
  //toggleFavorite: toggleFavorite
  toggleFavorite,
  pokemons,
};
