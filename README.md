# SelectoresApp

Esta aplicación consiste en entender cómo funcionan los selectores anidados en formularios reactivos de Angular. Hay 3 selectores (**continentes**, **países** y **fronteras**) los cuáles estan conectados entre sí. Las opciones seleccionadas influyen totalmente en el resultado. Por ejemplo, si se escoge un continente, después un país del mismo y después su frontera, pero el usuario decide volver a seleccionar otro continente, el país y su frontera se resetean en su opción inicial.

La aplicación se ha generado con la versión 16.0.0 de [Angular CLI](https://github.com/angular/angular-cli), con la versión 18.16.0 de NodeJS y con la versión 9.6.6 de npm.

## Iniciar la aplicación

Ejecutar el comando `npm start` y acceder a la URL `http://localhost:4200/`.

## Obtención de la información de la API

Se ha de acceder a la página de [REST Countries](https://restcountries.com) y allí están todas las URLs disponibles para obtener todos los países.
