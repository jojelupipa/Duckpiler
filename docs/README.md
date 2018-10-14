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

