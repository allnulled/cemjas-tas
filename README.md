# cemjas+tas

Documento oficial de la **Cross Environment and Modulable Javascript Application Standard + Trojanic Architecture Specification**.

![logo](logo-pemjastas.png)

El **cemjas+tas** es una especificación de cómo hacer código para aplicaciones en JavaScript que procura:

- Múltiples entornos cubiertos desde 1 mismo código fuente (cross-environment)
- Con código altamente modulable (modulable)
- Con una arquitectura que facilita la comandación remota mutua entre 2 nodos (trojanic architecture).

La siguiente especificación trata desde toolkit que hay que cubrir hasta especificidades en la redacción del código.

## Especificación

A continuación se exponen las especificaciones de programación.

### Especificación 1: El loop booster

Aquí uso:

- detecto cambios y cronometro comandos con [allnulled@refrescador](https://github.com/allnulled/refrescador).
- compilo el javascript modulable con [allnulled@pak-compiler](https://github.com/allnulled/pak-compiler).

Con las features que heredo de estos 2 proyectos ya tengo lo necesario para construir una **cemjas compliant application**.

Pero no todo vale, y por eso las especificaciones siguen.

### Especificación 2: Los entry points

La **cemjas+tas**, salvando la *trojanic architecture*, propone de base los siguientes **entry points**:

- `@{project}/bin.js`: programa para línea de comandos (nodejs)
- `@{project}/server.js`: programa para hablar con sistema operativo (nodejs)
- `@{project}/client.js`: programa para hablar con `server.js` (nodejs o web)
- `@{project}/gui.js`: programa para hablar con interfaz gráfica web (web)

Cada uno se compila independientemente de los demás, y solo usa los módulos que su parte demanda.

Se esperan pues las rutas relativas:

- `dist/@{project}/bin.dist.js`
- `dist/@{project}/server.dist.js`
- `dist/@{project}/client.dist.js`
- `dist/@{project}/gui.dist.js`
- `dist/@{project}/gui.dist.css`

#### Notas de los entry points

- El `bin` se espera que tenga un comando para despertar a 1 servidor único.
- El `server` se espera que sea único por sistema y reutilice los recursos entre cargas.
- El `client` se espera que sea basado en `socket-io.client.js` y vale igual para `nodejs` y `gui`.
- El `gui` se espera que sea tipo web normal

### Especificación 3: Directorios de una clase descomponible

Las `class` de `ES06` hay que evitarlas porque rompen la **modulabilidad**.

En su lugar se usan `object factories` que son funciones que devuelven un `Object` que ya tiene especificado su `prototype` (el método `Object.create` hace la función).

#### Ficheros js de clase

Y los nombres de cada fichero que compone la clase importan porque de ellos depende su **modulabilidad**.

- `Clase.js`: el constructor formalmente, pero la factory function que crea un objeto usando el prototype con `Object.create`.
- `Clase.prototype.js`: objeto con todas las propiedades y métodos del prototipo
- `Clase.prototype.*.js`: método dinámico
- `Clase.*.js`: método o api estática
- `Clase.*.*.js`: método de api estática

Tienes más modularidad, más agrupabilidad, más encontrabilidad, más documentabilidad, más estructura.

#### Ficheros satelitales de clase

Cada fichero js, clase o no, método o no, puede tiene sus homólogos (comparten el nombre pero no la extensión) que conviven en el mismo directorio:

- `*.md`: documentación adjunta
- `*.test.js`: test adjunto
- `*.*`: puedes inventarte otros, pero no serán oficiales

Esto se hace así para que en el vscode, en las pestañas, te puedas guiar por el nombre resaltado.

> si llamas a todos los ficheros `index.js` luego tienes problemas al buscar entre pestañas con el vscode.

Estos ficheros se utilizarán más adelante en otras herramientas satelitales del toolkit.