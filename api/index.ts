//Exportamos el default, que hace como un objeto, le damos un alias para así poder invocar las funciones de su interior como funciones propias de cualquier objeto | Ej -> pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
export { default as pokeApi } from "./pokeApi";
