# Proyecto_IV
Proyecto para la asignatura Infraestructura Virtual (UGR)
[![Build Status](https://travis-ci.com/jojelupipa/Duckpiler.svg?branch=master)](https://travis-ci.org/jojelupipa/Duckpiler)

La página con la documentación se puede
encontrar [aquí](https://jojelupipa.github.io/Duckpiler/).


**Duckpiler assistant**

El proyecto a desarrollar será un servicio que proporcione un pdf que
sea el resultado de una compilación de un fichero LaTeX o Markdown.

## Instalación y uso

La
clase
[duckpiler](https://github.com/jojelupipa/Duckpiler/blob/master/src/duckpiler.js) será
la encargada de procesar el archivo que se reciba.

Para probar esta clase, una vez descargado el repositorio
ejecutaremos:

```npm test```


## ¿Por qué?

En numerosas ocasiones, trabajando en el [repositorio de los apuntes
de libreim](https://github.com/libreim/apuntesDGIIM) se ha dado el
caso de que algún compañero estaba intentando estudiar pero se
encontraba desde algún dispositivo móvil, desde algún sistema
operativo inapropiado o simplemente no tenía herramientas de
compilación a mano. Por lo que se pensó hacer algún tipo de compilador
automático que resuelva este problema.

## Herramientas

* **Lenguaje de programación:** se utilizará Javascript (Node.js para
    la parte del servidor, utilizando un framework como [Express](http://expressjs.com/))

* **Integración continua:** con el motivo de llevar a cabo un
  desarrollo basado en tests se
  utilizará
  [travis](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/) para
  este proyecto. Para realizar los tests usaremos alguna herramienta
  como
  [Chai](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/),
  en conjunción con un marco de ejecución como puede
  ser [Mocha](https://mochajs.org/) (para controlar qué tests han
  fallado e incluso poder utilizarlo para hacer algún benchmark)

* **Base de datos:** Cualquier tipo de información que fuera necesario
  almacenar se gestionará desde una base de datos haciendo uso del
  SGBD PostgreSQL.

* **Entorno virtual de desarrollo:** Si queremos que el funcionamiento
  de nuestro servicio se mantenga independientemente de la versión del
  lenguaje de programación que tenga instalado el usuario y sin
  necesidad de solicitar permisos de superusuario se pueden usar
  entornos virtuales. Para node.js uno de los más populares
  es [nvm](https://github.com/creationix/nvm).

* **Herramienta de construcción:** Para facilitar la instalación de
  nuestra aplicación podemos usar alguna herramienta
  como [Grunt](https://gruntjs.com/) o [Gulp](https://gulpjs.com/)
  (conforme desarrollemos el servicio nos daremos cuenta de qué se
  adapta mejor a nuestras necesidades).

* **Despliegue:** La aplicación podrá ser desplegada con una máquina
  virtual en azure, aprovechando el registro que hicimos en [los
  ejercicios del tema introductorio](https://github.com/jojelupipa/Ejercicios_IV_18_19/blob/master/Relaciones%20de%20ejercicios/Tema%201.md) (aunque
  también existen otras alternativas
  como [Heroku](https://www.heroku.com/nodejs), que también es popular
  en el uso de node.js)


## ¿Cómo se va a desarrollar el proyecto?

En primer lugar se diseñará el esquema que seguirá el servicio. Y,
desde el primer momento en el que se añada código, se hará uso de la
integración continua para cerciorarnos de que el servicio funciona de
manera esperada desde su inicio.

Una vez se vayan consiguiendo resultados se probará en un entorno
virtual de desarrollo y se utilizará alguna herramienta de
construcción para que pueda ser usada por cualquier usuario.

Finalmente el servicio será desplegado en la nube, utilizando alguno
de los medios previstos (tales como Azure).
