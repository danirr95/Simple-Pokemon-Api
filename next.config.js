/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //Definimos la prop 'images'
  images: {
    //Indicamos en su prop 'domains' aquellos dominios de los que deseamos que next tome imagenes | Esto debemos hacerlo porque next intenta acceder a las imágenes de forma estática (como si estuvieran almacenadas en alguna carpeta de neustro proyecto)
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
