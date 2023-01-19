//Importamos la funcion 'createTheme' de Next
import { createTheme } from "@nextui-org/react"

//Almacenamos en una constante el obj devuelto por la funcion 'createTheme'
export const darkTheme = createTheme({
  //La prop 'type' con su valor en 'dark' nos brinda ya una configuración de colores predeterminada para un tema oscuro
  type: 'dark',
  //En la prop 'theme' y en concreto en su prop 'colors' podemos sobreescribir dichos colores que ya vienen predeterminados en el 'type: dark'
  theme: {
    colors: {}, // override dark theme colors
  }
});