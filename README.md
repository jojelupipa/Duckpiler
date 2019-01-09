# Proyecto: **D**uckpiler
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html) [![Build Status](https://travis-ci.com/jojelupipa/Duckpiler.svg?branch=master)](https://travis-ci.com/jojelupipa/Duckpiler)

Proyecto para la asignatura Infraestructura Virtual (UGR)

La página con la documentación se puede
encontrar [aquí](https://jojelupipa.github.io/Duckpiler/).

Indice
======

<!--ts-->
* [Requisitos](#requisitos)
  * [Otros requisitos](#otros-requisitos)
* [Instalación y uso](#instalación-y-uso)
  * [Probando la clase principal](#probando-la-clase-principal)
* [¿Por qué?](#por-qué)
* [Herramientas](#herramientas)
* [Despliegue en heroku](#desplegando-en-heroku)
* [Despliegue con Docker en Zeit](#despliegue-con-docker-en-zeit)
* [Replicación del entorno](#replicacion-del-entorno)
* [Despliegue de la aplicación en entorno remoto](#despliegue-de-la-aplicacion-en-entorno-remoto)
<!--te-->

**Duckpiler assistant**

El proyecto a desarrollar será un servicio que proporcione un pdf que
sea el resultado de una compilación de un fichero LaTeX o Markdown.

## Requisitos

* [nodejs](https://nodejs.org/en/)

* [npm](https://www.npmjs.com/get-npm)

* [git](https://git-scm.com/downloads) *opcional para descargar este repo*

### Otros requisitos

Para despliegue de máquinas virtuales:

* [vagrant](https://www.vagrantup.com/)

Despliegue servicio automático:

* [Flightplan](https://www.npmjs.com/package/flightplan): dependencia
  de npm, pero se ha de instalar globalmente para poder ejecutar los
  comandos de flightplan. `npm install -g flightplan`

Despliegue con Heroku:

*
  Cliente
  [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

Despliegue con Zeit:

* Cliente [zeit now](https://zeit.co/download#now-cli). Instalable con
  `npm install -g now`


## Instalación y uso


Para probar este servicio, una vez descargado el repositorio
ejecutaremos:

```npm install```

Y posteriormente para probarlo:

```npm start```

Esto nos proporcionará este servicio escuchando en el puerto 8080.

### Probando la clase principal

La
clase
[duckpiler](https://github.com/jojelupipa/Duckpiler/blob/master/src/duckpiler.js) será
la encargada de procesar el archivo que se reciba.

Podemos probar que funciona debidamente

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
    la parte del servidor, utilizando como framework [Express](http://expressjs.com/))

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
  SGBD PostgreSQL *(hasta el momento no ha sido necesario)*.

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

* **Desplegar:** La aplicación ha sido desplegada con una máquina
  virtual en azure, aprovechando el registro que hicimos en [los
  ejercicios del tema introductorio](https://github.com/jojelupipa/Ejercicios_IV_18_19/blob/master/Relaciones%20de%20ejercicios/Tema%201.md) y
  las suscripciones proporcionadas por el profesor de la asignatura (aunque
  también existen otras alternativas
  como [Heroku](https://www.heroku.com/nodejs), que también es popular
  en el uso de node.js o [zeit](http://zeit.co/))


## ¿Cómo se va a desarrollar el proyecto?

En primer lugar se diseñará el esquema que seguirá el servicio. Y,
desde el primer momento en el que se añada código, se hará uso de la
integración continua para cerciorarnos de que el servicio funciona de
manera esperada desde su inicio.

Una vez se vayan consiguiendo resultados se probará en un entorno
virtual de desarrollo y se utilizará alguna herramienta de
construcción para que pueda ser usada por cualquier usuario.

Finalmente el servicio será desplegado en la nube, utilizando alguno
de los medios previstos (desplegado en Heroku, Zeit y Azure).


## Desplegando en Heroku

Se ha elegido Heroku como PaaS para desplegar la aplicación,
principalmente por ser una de las mejores herramientas gratuitas que
se integran bien con node.js. Proporciona otras
facilidades como la sencillez con la que se pueden desplegar
aplicaciones con simplemente hacer `push` al repositorio de Heroku (de
hecho, con la configuración adecuada se puede gestionar el push
automático con cada push al repositorio de github). Permite
seleccionar la región del servidor en la que estará tu aplicación y
permite “dormir” o desactivar las aplicaciones cuando estén un tiempo
sin ser usadas para permitir ahorrar recursos.

Podemos
ver
[los pasos a seguir](https://jojelupipa.github.io/Duckpiler/#desplegando-en-heroku) con
los que tendríamos nuestra aplicación desplegada.

Despliegue aquí: [https://genuine-duckpiler.herokuapp.com/](https://genuine-duckpiler.herokuapp.com/)


## Despliegue con Docker en Zeit

Hemos creado
[en
DockerHub](https://hub.docker.com/r/jojelupipa/duckpiler/) un
repositorio para nuestro proyecto (al cual se publicará
automáticamente al hacer push a Github con un webhook).

Y posteriormente lo hemos desplegado en Zeit con la orden `now`, que
se ejecuta en función del contenido del archivo `now.json`.

Contenedor: https://duckpiler-ronrdiarsz.now.sh/

Para el contenedor hemos utilizado un fichero Dockerfile que nos ha
permitido configurar cómo se construye dicho contenedor y qué comando
hay que usar para ejecutar nuestra aplicación. Y para el despliegue en
Zeit hemos proporcionado un archivo de configuración para que se pueda
desplegar el contenedor de Docker.

Podemos consultar un poco más sobre esta configuración en la
[documentación de este repositorio](https://github.com/jojelupipa/Duckpiler/blob/master/docs/README.md)

## Replicación del entorno

¿Quieres probar el servicio en un entorno testeado?

Bien sea para desarrollar o para probarlo por ti mismo puedes hacer
uso de [vagrant](https://www.vagrantup.com/) para desplegar una
máquina debidamente provisionada
con [chef](https://www.chef.io/chef/). Simplemente tienes que usar
`vagrant up` ya puedes disponer de una máquina con todo lo necesario.

Esta configuración se ha hecho para desplegar una máquina virtual de
azure. Si quieres ver alguna alternativa para hacerlo en local
consulta la
documentación [aquí](https://jojelupipa.github.io/Duckpiler/#replicaci%C3%B3n-del-entorno-sin-azure)

## Despliegue de la aplicación en entorno remoto

Para desplegar la aplicación en este nuevo entorno hemos
usado [flightplan](https://www.npmjs.com/package/flightplan)
*(aprovechando que estamos usando nodejs)*. Con
un [conjunto de planes](https://jojelupipa.github.io/Duckpiler/#despliegue-de-la-aplicaci%C3%B3n-en-entorno-remoto)
para desplegar, detener o reanudar la aplicación (como parte de las
tareas de mantenimiento).

En definitiva cualquiera puede coger este proyecto y desplegarlo con
dos sencillas órdenes:

`vagrant up`

`fly deployTo:azure --flightplan despliegue/flightplan.js`

Normalmente, cuando está desplegada se encuentra la aplicación en
[este dominio](http://duckpiler.westeurope.cloudapp.azure.com:8080). Pero
por motivos didácticos aquí adjunto la IP actual:

Despliegue final: 40.118.125.5:8080

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://naereen.github.io/badges/)
