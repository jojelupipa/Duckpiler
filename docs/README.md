# Proyecto_IV
Proyecto para la asignatura Infraestructura Virtual (UGR)

**Duckpiler assistant**

El proyecto a desarrollar será un servicio que proporcione un pdf que
sea el resultado de una compilación de un fichero LaTeX o Markdown.


## ¿Por qué?

En numerosas ocasiones, trabajando en el [repositorio de los apuntes
de libreim](https://github.com/libreim/apuntesDGIIM) se ha dado el
caso de que algún compañero estaba intentando estudiar pero se
encontraba desde algún dispositivo móvil, desde algún sistema
operativo inapropiado o simplemente no tenía herramientas de
compilación a mano. Por lo que se pensó hacer algún tipo de compilador
automático que resuelva este problema. 

## Añadiendo Integración Continua

### Herramientas utilizadas

Para llevar a cabo los tests se han usado (dada la simplicidad de los
tests actuales) el
módulo [assert](https://nodejs.org/api/assert.html), que se encuentra
incluído en node. Si posteriormente se observase un beneficio por
utilizar [chai](https://www.chaijs.com/) para realizar tests más
complejos no sería ningún problema incluirlo en el proyecto.

Para ejecutar los tests se ha usado [Mocha](https://mochajs.org/),
pues es un framework bastante extendido y cómodo que nos describe el
resultado de la ejecución de los tests junto al tiempo transcurrido
(lo cual puede ayudar a la hora de establecer algún benchmark para
probar la aplicación).

Para gestionar la integración continua se ha
utilizado [travis](https://travis-ci.org/), principalmente por su
integración con github y su facilidad de uso.

## Desplegando

### Desplegando en Heroku

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

Para crear la app primero debemos pedirle a heroku que la cree en
nuestra región. En nuestro repositorio ejecutaríamos:

```heroku apps:create --region eu ```

Esto nos dará una aplicación con un nombre aleatorio. Así que podemos
renombrarlo al nombre que queremos.

```heroku apps:rename --app nombre-aleatorio-69349 genuine-duckpiler```

Y es importante destacar que esto implica que hay que cambiar la url
del remote de heroku, pues en caso contrario intentaríamos publicar en
un repo de heroku que ya no existe.

```git remote set-url heroku
https://git.heroku.com/genuine-duckpiler.git```

Antes de publicarlo necesitamos añadir a nuestro proyecto un archivo
`Procfile` que indique cómo se debe lanzar la aplicación. Este fichero
simplemente tendrá `web: node src/index.js`. Y para publicarlo
tendríamos que hacer push a dicho repositorio. 

```git push heroku master```


Con esto tendríamos nuestra aplicación desplegada.

Despliegue aquí: [https://genuine-duckpiler.herokuapp.com/](https://genuine-duckpiler.herokuapp.com/)


### Despliegue automático desde Github

Cuando estamos trabajando es posible que queramos realizar
“simultáneamente” el despliegue en Github y en Heroku. Así ahorrarnos
tener que hacer `push` al repo de Github y de Heroku por separado.

Por suerte podemos encontrar un modo de automatizar este proceso, en
nuestro caso configuramos desde Heroku el despliegue autorizando el
acceso al repo de github. Primero tenemos que conectar la aplicación.

![](img/Despliegue_heroku_automatico.png)


Y para confirmar simplemente activamos las opciones de despliegue
automático, que es compatible con CI, para que solo se despliegue en
caso de haber pasado los tests de Integración Continua.

![](img/Despliegue_heroku_2.png)


## Despliegue con Docker en Zeit


Hemos creado
[en
DockerHub](https://hub.docker.com/r/jojelupipa/duckpiler/) un
repositorio para nuestro proyecto (al cual se publicará
automáticamente al hacer push a Github con un webhook). 


Y posteriormente lo hemos desplegado en Zeit con la orden `now`, que
se ejecuta en función del contenido del archivo `now.json`.

Contenedor: https://duckpiler-hinlulcolf.now.sh/


Para el contenedor hemos utilizado un fichero Dockerfile que nos ha
permitido configurar cómo se construye dicho contenedor y qué comando
hay que usar para ejecutar nuestra aplicación. Y para el despliegue en
Zeit hemos proporcionado un archivo de configuración para que se pueda
desplegar el contenedor de Docker.


Es destacable acerca del Dockerfile la siguiente configuración:

```Dockerfile
FROM node:8.12.0-jessie   # Esta es la imagen desde la que queremos construir 

CMD [ "npm", "start" ]   # Este define el comando para arrancar la aplicación (npm start)
```


Para el archivo `now.json` también hemos tenido que configurar algunas cosas:

```json
{
    "type":"docker", // Indica que estamos desplegando un contenedor de Docker
    "version": 1,
    "features": { // Previene de la restricción de tamaño
        "cloud": "v1"
    }
}
```

## Replicación del entorno

¿Quieres probar el servicio en un entorno testeado?

Bien sea para desarrollar o para probarlo por ti mismo puedes hacer
uso de [vagrant](https://www.vagrantup.com/) para desplegar una
máquina debidamente provisionada
con [chef](https://www.chef.io/chef/). Simplemente tienes que usar
`vagrant up` ya puedes disponer de una máquina con todo lo necesario.

Esta configuración se ha hecho para desplegar una máquina virtual de
azure. 

### Replicación del entorno sin Azure

Si quieres conseguir una máquina virtual local que esté igualmente
configurada puedes ignorar las especificaciones del Vagrantfile para
Azure y usar otro genérico como este:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "nombre_maquina_virtual"
  
  # Redirigir el puerto del servicio a tu puerto 5000 (puede elegirse otro)
  config.vm.network "forwarded_port", guest: 5000, host: 8080


  # Install with chef

  config.vm.provision "chef_solo" do |chef|
    chef.add_recipe "emacs"
    chef.add_recipe "git"
  end
end
```

Esto, tras descargar alguna [vagrantbox](https://www.vagrantbox.es/) y
sustituir el valor de `config.vm.box` por el que corresponda
permitiría preparar un entorno debidamente provisionado con `vagrant
up`. Lo que dejaría lista la máquina para trabajar con ella con
`vagrant ssh` *(una conexión ssh “automatizada” a esta máquina)*.


## Despliegue de la aplicación en entorno remoto

Para desplegar la aplicación en este nuevo entorno hemos
usado [flightplan](https://www.npmjs.com/package/flightplan)
*(aprovechando que estamos usando nodejs)*. 

Con este **conjunto de planes** podemos:

Desplegar de cero la aplicación y tenerla de servicio

`fly deployTo:azure --flightplan despliegue/flightplan.js` 

Detener con otro plan de vuelo la ejecución del servicio

`fly stop:azure --flightplan despliegue/flightplan.js` 

Reanudar el servicio

`fly run:azure --flightplan despliegue/flightplan.js` 

Borrar el repositorio

`fly deleteAll:azure --flightplan despliegue/flightplan.js` 


En definitiva cualquiera puede coger este proyecto y desplegarlo con
dos sencillas órdenes:

`vagrant up`

`fly deployTo:azure --flightplan despliegue/flightplan.js`

Normalmente, cuando está desplegada se encuentra la aplicación en
[este dominio](http://duckpiler.westeurope.cloudapp.azure.com:8080).
