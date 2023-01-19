//Interface creada para indicar el tipado personalizado a los datos retornados por la response a la api de pokemon
export interface PokemonListResponse {
  count: number;
  //Optional
  next?: string;
  //Optional
  previous?: string;
  //La prop result será un array de datos de tipo SmallPokemon
  results: SmallPokemon[];
}

//Interface para tipado personalizado de cada elemento que forma parte del array de resultados
export interface SmallPokemon {
  name: string;
  url: string;
  id: number;
  img: string;
}
