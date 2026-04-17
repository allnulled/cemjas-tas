# cemjas+tas

Documento oficial de la **Cross Environment and Modulable Javascript Application Standard + Trojanic Architecture Specification**.

![logo](logo-pemjastas.png)

## Características

El **cemjas+tas** es una especificación de cómo hacer código para aplicaciones en JavaScript que procura:

- Múltiples entornos cubiertos desde 1 mismo código fuente (cross-environment)
- Con código altamente modulable (modulable)
- Con una arquitectura que facilita la comandación remota mutua entre 2 nodos (trojanic architecture).

La siguiente especificación trata desde toolkit que hay que cubrir hasta especificidades en la redacción del código.

## Índice

- [cemjas+tas](#cemjastas)
  - [Características](#características)
  - [Índice](#índice)
  - [Cumplimiento específico](#cumplimiento-específico)
  - [Especificaciones](#especificaciones)
    - [Especificación 1: un loop booster](#especificación-1-un-loop-booster)
    - [Especificación 2: los entry points de una arquitectura troyánica](#especificación-2-los-entry-points-de-una-arquitectura-troyánica)
      - [Especificación 2.1: requerimientos de los entry points](#especificación-21-requerimientos-de-los-entry-points)
    - [Especificación 3: ficheros de una clase descomponible](#especificación-3-ficheros-de-una-clase-descomponible)
      - [Especificación 3.1: cuándo sí usar class de ES06](#especificación-31-cuándo-sí-usar-class-de-es06)
      - [Especificación 3.2: cómo replicar todo el comportamiento de class](#especificación-32-cómo-replicar-todo-el-comportamiento-de-class)
      - [Especificación 3.3: herencia de rasgos al estilo Dart](#especificación-33-herencia-de-rasgos-al-estilo-dart)
      - [Especificación 3.4: herencia completamente modulable](#especificación-34-herencia-completamente-modulable)
    - [Especificación 4: disposición de clases js](#especificación-4-disposición-de-clases-js)
    - [Especificación 5: disposición de ficheros satelitales al js](#especificación-5-disposición-de-ficheros-satelitales-al-js)
    - [Especificación 6: soporte para tests rápidos](#especificación-6-soporte-para-tests-rápidos)
    - [Especificación 7.1: un framework de testing incluido](#especificación-71-un-framework-de-testing-incluido)
    - [Especificación 7.2: desarrollo con test por fichero](#especificación-72-desarrollo-con-test-por-fichero)
    - [Especificación 8: errores detallados](#especificación-8-errores-detallados)
      - [Especificación 8.1: tipos de error](#especificación-81-tipos-de-error)
    - [Especificación 9: tipos de fichero js](#especificación-9-tipos-de-fichero-js)
    - [Especificación 10: carga de módulos asíncronos](#especificación-10-carga-de-módulos-asíncronos)
      - [Especificación 10.1: rangos de tiempo de una aplicación](#especificación-101-rangos-de-tiempo-de-una-aplicación)
      - [Especificación 10.2: estrategía de carga asíncrona vía promesa iniciada en `on-module time`](#especificación-102-estrategía-de-carga-asíncrona-vía-promesa-iniciada-en-on-module-time)
      - [Especificación 10.3: estrategia de carga asíncrona vía patrón `Event manager` o `Lifecycle pattern`](#especificación-103-estrategia-de-carga-asíncrona-vía-patrón-event-manager-o-lifecycle-pattern)
    - [Especificación 11: indexación de módulos rápidos](#especificación-11-indexación-de-módulos-rápidos)
    - [Especificación 11.0: caso de módulo indexado simple](#especificación-110-caso-de-módulo-indexado-simple)
      - [Especificación 11.1: caso donde módulo indexado es factoría de otro módulo indexado](#especificación-111-caso-donde-módulo-indexado-es-factoría-de-otro-módulo-indexado)
      - [Especificación 11.2: caso donde módulo indexado es árbol de módulos indexados](#especificación-112-caso-donde-módulo-indexado-es-árbol-de-módulos-indexados)
      - [Especificación 11.3: caso donde módulo indexado generado en asíncrono es factoría de otro módulo indexado](#especificación-113-caso-donde-módulo-indexado-generado-en-asíncrono-es-factoría-de-otro-módulo-indexado)
      - [Especificación 11.4: cuándo exportar o indexar una función asíncrona y cuándo una promesa](#especificación-114-cuándo-exportar-o-indexar-una-función-asíncrona-y-cuándo-una-promesa)
      - [Especificación 11.5: cómo exportar y reusar un valor asíncrono](#especificación-115-cómo-exportar-y-reusar-un-valor-asíncrono)
      - [Especificación 11.6: cuándo afecta la recursividad](#especificación-116-cuándo-afecta-la-recursividad)

## Cumplimiento específico

A continuación se listan todas las especificaciones que el estándar `cemjas+tas` cumple con una breve y superficial explicación:

```
Trojanic Architecture By Separated Entry Points Compliance
Loop Booster Compliance
Full Modulable Optimization Compliance
Full Modulable Inheritance Compliance
Full Modulable Case Compliance
Test Framework Provision Compliance
Test-Per-File Development Compliance
Detailed Error Compliance
Fast Error Type Creation Compliance
Async Module Load Management Compliance
```

## Especificaciones

A continuación se exponen las especificaciones de programación.

### Especificación 1: un loop booster

La **Loop Booster Compliance** obliga a proveer de 1 bucle de escucha activa de ficheros para compilar a cada cambio.

Aquí uso:

- detecto cambios y cronometro comandos con [allnulled@refrescador](https://github.com/allnulled/refrescador).
- compilo el javascript modulable con [allnulled@pak-compiler](https://github.com/allnulled/pak-compiler).
   - mucho más rápido que el tooling pesado que está de moda para soportar TypeScript, JSX, etc.
   - esta especificación no entra ni en los timings ni en el stack
      - pero si estás conforme con el JavaScript clásico:
      - *deberías prescindir de estas tecnologías que aportan mucha fanciness y nada nuevo que no permitiera JavaScript, todo a varios precios, y con limitaciones muy marcadas*

Con las features que heredo de estos 2 proyectos ya tengo lo necesario para construir una **cemjas+tas compliant application**.

Pero no todo vale, y por eso las especificaciones siguen.

### Especificación 2: los entry points de una arquitectura troyánica

La **Trojanic Architecture By Separated Entry Points Compliance** obliga a tener diferenciadas las entradas de cada programa necesario para construir una arquitectura troyánica.

Una **entrada** o entry point en este contexto significa el fichero de partida de 1 proceso compilatorio.

En este aspecto, el `cemjas+tas` propone las siguientes entradas:

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

#### Especificación 2.1: requerimientos de los entry points

- El `bin` se espera que tenga un comando para despertar a 1 servidor único.
- El `server` se espera que sea único por sistema y reutilice los recursos entre cargas.
- El `client` se espera que sea basado en `socket-io.client.js` y vale igual para `nodejs` y `gui`.
- El `gui` se espera que sea tipo web normal

### Especificación 3: ficheros de una clase descomponible

Esta especificación trata de fijar cómo describir clases de forma sistemática.

Las `class` de `ES06` es un subconjunto de usos de los `prototype` de `ES05`.

Con `prototype` podemos hacer:

```js
module.exports = base => Object.create(Object.assign(base, proto1, proto2, proto3));
```

Con `class` no podemos hacer:

```js
module.exports = class extends proto1, proto2, proto3 {};
```

Si hemos entendido bien, la idea de reaprovechar código va más con `prototype` que con `class`.

Sin embargo, `class` aporta una claridad y explicidad del código que por seguro echaremos en falta si nos lanzamos al patrón `prototype`.

Este es el punto medio donde explotas `class` en su máxima flexibilidad:

```js
const Clase1 = class extends ProtoBase {
    propiedadUno = proto2.prototype.propiedadUno;
    propiedadDos = proto2.prototype.propiedadDos;
    propiedadTres = proto2.prototype.propiedadTres;
    propiedadCuatro = proto2.prototype.propiedadCuatro;
};
Object.assign(Clase1.prototype, {
    // Aquí tenemos el grupo de propiedades, pero en class no podemos intervenir, tenemos que definirlas después:
    propiedadCinco: proto3.prototype.propiedadCinco,
    propiedadSeis: proto3.prototype.propiedadSeis,
    propiedadSiete: proto3.prototype.propiedadSiete,
    propiedadOcho: proto3.prototype.propiedadOcho,
});
```

Por todo esto, se recomienda mejor el uso de `prototype`, pero siendo consciente que:

- `class` estandariza mayor legibilidad que `prototype`
- `class` garantiza ciertas buenas prácticas de reutilización de código
- `class` minimiza ciertas confusiones y malentendidos del uso de `prototype`
- pero `class` rompe cierto patrón de reutilización si no lo encajas correctamente
   - concretamente, la reutilización de conjuntos de propiedades y métodos
   - que además sería la fórmula final con la cual uno compondría esquemas computables más rápido
      - decorando clases con atributos
      - TypeScript también manquea aquí con alguna feature que parece que sí, pero realmente tampoco
      - Por tanto, `class` no está mal, pero tiene la puerta de las siguientes features sintácticas bloqueada
         - y `prototype` no.

#### Especificación 3.1: cuándo sí usar class de ES06

Cuando:

- Renuncias a herencia de clases vía rasgos 100% modulables
   - Puedes recurrir a rasgos en runtime
   - Puedes recurrir a rasgos sobreescribiendo el `prototype`
   - Puedes recurrir a tu propio lifecycle de rasgos
   - Pero renuncias a una API de rasgos 100% modulables estándar

El código 1 es menos flexible que el código 2:

```js
module.exports = class {
    constructor() {
        console.log("Constructing");
    }
    getName() {
        return this.name;
    }
    // versión reusable:
    getSomething: Pak.require("path/to/method/getSomething.js");
};
```

En el código 2 tenemos separada cada firma computable como una variable:

```js
const x = function() {
    console.log("Constructing");
};
x.prototype.getName = function() {
    return this.name;
}
module.exports = x;
```

Y en última instancia, podemos usar más naturalmente `Object.create` y `Object.assign`.

#### Especificación 3.2: cómo replicar todo el comportamiento de class

Esto es lo que te deja hacer `class` con ES06:

```js
class X {
    static a = 100;
    constructor() {
        this.name = "ok";
    }
    name = "default";
    getName() {
        return this.name;
    }
}
class Z extends X {
    static a = 100;
    constructor() {
        this.name = "ok";
    }
    name = "default";
    getName() {
        return this.name;
    }
}
```

Esto es lo mismo con `ES05`:

```js
const X = function () {
  this.name = "default";
  this.name = "ok";
}
X.prototype.getName = function () {
  return this.name;
};
X.a = 100;
const Z = function() {
  X.call(this);
  this.name = "default";
  this.name = "ok";
}
Z.prototype = Object.create(X.prototype);
Z.prototype.constructor = Z;
Z.prototype.getName = function () {
  return this.name;
};
Z.a = 100;
// como class extends real:
Object.setPrototypeOf(Z, X);
```

Se lee más complicado, pero permite 100% modularidad, lo demás queda intra-función.

Así, `...rasgos` y `Object.assign(prot, rasgos)` serían 2 formas sencillas de hacer herencia horizontal.

#### Especificación 3.3: herencia de rasgos al estilo Dart

Dart utiliza un método muy concreto de herencia para poder:

- definir múltiples `trait` independientes
- aplicarlos a una `class` simultáneamente, consiguiendo herencia horizontal con verticalidad porque consigue...
- mantener los `trait` en la cadena `prototype`
   - por tanto, conseguir `traits prototype-compliant`
   - y permitir el uso de `instanceof` con los traits también

Se trata de un juego de factories de clases que acaban definiendo la clase final y cumpliendo con la herencia prototípica enmascarada por rasgos.

No he podido encontrar `dart2js` y el método de compilación que usa `dartdevc compile js` genera un framework reflectivo intermedio, así que no puedo poner el ejemplo limpio.

La crítica es que si la chain de abstracciones se hace muy larga, ese método puede ser contraproducente.

Para más, la [Especificación 3.4](#).

#### Especificación 3.4: herencia completamente modulable

La **Full Modulable Inheritance Compliance** obliga a diseñar una estrategia de herencia mediante módulos que se puedan reutilizar, es decir, la unidad reusable es más pequeña que la clase que permite herencia.

En otros lenguajes se traduce por `mixin`, `trait`, `barrel file` o `interface`. En nuestro caso, hablaremos de `signatures collection`:

> Una `signatures collection` o **colección de firmas** es un objeto JavaScript plano, sin prototype.

La herencia 100% modular se consigue gracias a `src/cem/oop/Oot.js` y se usaría así:

```js
const SomeObject0 = {};
const SomeObject1 = {};
const SomeObject2 = {};
const SomeObject3 = {};
const Class1 = Pak.require("src/cem/oop/Oot.js").createClass({
    prototype: SomeObject0,
    traits: [
        SomeObject1,
        SomeObject2,
        SomeObject3,
    ],
    constructor() {
        console.log("No hay super, hay constructor único componible");
    },
    static: {
        staticProp1: 100,
        staticProp2: 200,
    }
    dynamic: {
        dynamicProp1: 100,
        dynamicProp2: 200,
    }
});
```

Lo que se pierde y lo que se gana:

- Se pierde el reuso del `prototype` como abstracción intermedia
- Se pierde la llamada a constructores prototipo en la instanciación
- Se gana legibilidad de la instancia
- Se gana tiempo en búsqueda por las capas `prototype`
- Se gana **componibilidad** que es el target importante

### Especificación 4: disposición de clases js

La **Full Modulable Inheritance Compliance** implica separación de los componentes de clases en ficheros aparte. En este apartado se habla del caso.

Los nombres de cada fichero que compone la clase importan porque de ellos depende su **modulabilidad**.

En una clase **con componentes reusables**, conviene separar cada propiedad y método en fichero suelto, y hacer grupos selectivos:

- `Clase.js`: la función constructora + su `prototype` modificado.
- `Clase.constructor.js`: la función constructora.
- `Clase.prototype.js`: objeto con todas las propiedades y métodos del prototipo
- `Clase.prototype.*.js`: método dinámico
- `Clase.*.js`: método o api estática
- `Clase.*.*.js`: método de api estática

Tienes más modularidad, más agrupabilidad, más encontrabilidad, más documentabilidad, más estructura.

Es más verboso y ruidoso, y muchas veces no hay reusabilidad dentro de las funciones de una clase. Así que conviene ver cuándo tiene sentido y cuándo no.

### Especificación 5: disposición de ficheros satelitales al js

Cada fichero js, clase o no, método o no, puede tener homólogos, ficheros que comparten el nombre pero no la extensión. Los ficheros homólogos oficiales de la especificación actual son:

- `*.md`: documentación adjunta
- `*.test.js`: test adjunto
- `*.*`: puedes inventarte otros, pero no serán oficiales

Esto se hace así para que en el vscode, en las pestañas, te puedas guiar por el nombre resaltado, porque si llamas a todos los ficheros `index.js` luego tienes problemas al buscar entre pestañas con el vscode.

### Especificación 6: soporte para tests rápidos



Puedes añadir *tests unitarios* en paralelo de 2 formas:

- fichero satelital tipo: `@@/ruta/a/mi/Clase.test.js`
- fichero de test tipo: `@@/test/ruta/a/mi/Clase.js`

Uno sirve para prependizar el infijo y el otro para apendizarlo, pero hacen lo mismo.

Para lanzar tests o compilar+ejecutar cualquier fichero, `pak test` te hace la función:

```sh
pak test src/ruta/a/mi/clase.js       # Este ejecuta la clase
pak test test/src/ruta/a/mi/clase.js  # Este ejecuta el test
pak test --all                        # Este ejecuta TODOS los tests en: "test/**/*.js" y "**/*.test.js"
```

### Especificación 7.1: un framework de testing incluido

La **Test Framework Provision Compliance** obliga a tener 1 framework para tests por lo menos.

- El módulo `src/cem/tester/TestCollection.js` se encarga de la capa programática (o API).
   - Toolkit básico para testing desde programa
- El comando `pak test fichero.js` y `pak test --all` se encarga de la capa operativa (o CLI).
   - Comando básico para testing desde sistema operativo

### Especificación 7.2: desarrollo con test por fichero

La **Test-Per-File Development Compliance** obliga a dar la opción de testear cada fichero `js` con su propio test.

- El comando `pak test fichero.js` y `pak test --all` se encarga de la capa operativa (o CLI).
   - Permite con `--all` lanzar todos los comandos que:
      - Empiecen con `test/**/*.js`
      - Acaben con `**/*.test.js`

### Especificación 8: errores detallados

La **Detailed Error Compliance** obliga a permitir tratar los errores como objetos con propiedades en lugar de texto y clase solamente.

Los errores de la aplicación pasan a consistir en un JSON que indica todos los detalles necesarios para informar del error.

La forma de lanzar errores pasa a ser:

```js
throw Pak.require("src/cem/error/ErrorData.js").create({
    detalle1: 1,
    detalle2: 2
});
```

#### Especificación 8.1: tipos de error

La **Fast Error Type Creation Compliance** obliga a tener 1 tipo de error padre de todos, y no tener mil clases diferentes para cada tipo de error que la aplicación va necesitando.

En caso de querer construir tipos de errores, en lugar de extender la clase `Error` y cambiarle el `name` en cada caso, lo que se hace es reservar la propiedad `type: "ErrorType"`.

```js
throw Pak.require("src/cem/error/ErrorData.js").create({
    type: "SyntaxError",
    location: {
        start: 0,
        end: 5
    }
});
```

### Especificación 9: tipos de fichero js

En este apartado hablamos de los tipos de fichero js que vamos a encontrar, porque nos servirá para un mayor orden en el código que generamos.

Los ficheros js que vamos a modular son básicamente siempre de 2 tipos:

- ficheros lógica
   - *hacen cosas, no solo exportan*
- ficheros tipo
   - *no hacen cosas, solo exportan cosas*
   - pueden exportar una `signature collection`
   - pueden exportar cualquier otro valor

Estos 2 conceptos son:

- **concurribles**: un fichero puede ser fichero lógica y fichero tipo a la vez
- **intercambiables**: porque...
   - un fichero lógica que no exporta nada, sería un fichero tipo que exporta `undefined` al fin y al cabo.
   - y un fichero tipo siempre será un fichero lógica que construye lo que exporta y lo exporta al fin y al cabo.

**¿Entonces por qué esta distinción, si son definiciones intercambiables?**

Para entender mejor.

Normalmente, ficheros lógica solo habrá 1: el **main.js**, o entry point en nuestro estándar. Todos los demás, normalmente serían ficheros tipo.

En los ficheros tipo **se intenta** (porque no siempre es posible, hablaremos de las excepciones, pero se intenta) encerrar la lógica en funciones. Esto bypasea la evaluación de ese código, y nos permite late-evaluation, teniendo variables que no necesariamente existan en ese momento. Si esa lógica queda fuera de las funciones, será evaluado, y las variables faltantes harán que lance error.

Pero en general esto, gracias a `PakCompiler` y su auto-orden en el sistema de dependecias, en principio no nos tendría que afectar, porque si en los ficheros js usamos variables que recogemos con `Pak.require`, el compilador ya se encargará de poner los ficheros dependidos antes que los dependientes.

**¿En qué casos de los ficheros tipo no es posible encerrar la lógica en funciones?**

Cuando la firma que quieres exportar la construyes con factories propios.

```js
module.exports = {
    metodo1: Pak.require("fabrica/de/metodos/tal.js").make(1),
    metodo2: Pak.require("fabrica/de/metodos/tal.js").make(2),
    metodo3: Pak.require("fabrica/de/metodos/tal.js").make(3),
};
```

En este ejemplo, estamos fabricando los métodos, no simplemente asignándolos, sino que llamamos. Y se puede complicar más:

```js
module.exports = {
    metodo4: await Pak.require("fabrica.js").make(4)
};
```

Esto, por ejemplo, no podemos hacerlo. Porque los módulos no se están ejecutando en código asíncrono, no podemos usar `await`. Tenemos que dar un poco de vuelta. Esto se hace para preservar la velocidad en el `load-time`.

La especificación 10 trata de cómo cargar módulos asíncronos con `Pak`.

### Especificación 10: carga de módulos asíncronos

La `Async Module Load Management Compliance` procura métodos suficientes para la carga de módulos asíncronos.

- la `Especificación 10.1` es solo para contextualizar.
- la `Especificación 10.2` es la estrategia preferible: carga asíncrona vía promesa iniciada en `on-module time`.
- la `Especificación 10.3` son otras 2 estrategias posibles: carga asíncrona vía patrón `Event manager` o `Lifecycle pattern`.

#### Especificación 10.1: rangos de tiempo de una aplicación

Con Pak tenemos estos tiempos:

- `development time`: es cuando estás escribiendo el código.
- `compilation time`: es cuando el código escrito lo pasas a distribuible, ejecutable.
- `runtime:` es cuando el código se está ejecutando.
   - `pre-module time`: lo que se ejecuta antes de nuestro módulo
   - `on-module time` o `on-load time`: la primera ejecución de nuestro módulo, siempre en sync (porque async puede haber cagada fácil y así es más controlado)
   - `post-module time`: aquí ya puede ser async.
      - `start time`: aquí inicias la aplicación, pero puede que quieras hacer cargas asíncronas

Ahora profundizamos en el `start time` que es donde podemos iniciar las cargas asíncronas.

Hay diferentes **estrategias de carga asíncrona** dentro del `start time`. A continuación se explican.

#### Especificación 10.2: estrategía de carga asíncrona vía promesa iniciada en `on-module time`

El ejemplo va a ser: *la conexión de la base de datos, y las migraciones*.

- Necesitamos la conexión primero, que es una carga asíncrona.
- Usamos la conexión después, para ejecutar la migración, que es otra carga asíncrona.
- Miramos de cómo encajarlo en el `main.js`.

La estrategía consiste en que `on-module time` exportas una `Promise` en un objeto o no, en este caso no, solo la `Promise` (no async function: `Promise`):

```js
// database-connection.js
module.exports = (async function() {
    return await createConnectionSomehow();
})();
```

En la migración, cargamos asíncronamente los fuentes de migraciones que son asíncronos, y la conexión. Y con el utils, migramos:

```js
// database-migration.js
module.exports = (async function() {
    // Módulos asíncronos anteriores:
    const [sources, connection] = await Promise.all([
        Pak.require("database-migration-sources.js"), // Fingiremos que las migraciones las cargamos en asíncrono, que puede ser
        Pak.require("database-connection.js"), // Y la conexión que es asíncrono
    ]);
    // Resultado del módulo asíncrono actual:
    return await Pak.require("database-utils.js").migrateBySources(connection, sources);
})();
```

Finalmente, en el `main.js` no hace falta que llamemos a nada, solo hacemos `await` del módulo:

```js
module.exports = (async function() {
    const { sources, connection, results } = await Pak.require("database-migration.js");
})();
```

Este patrón es el más limpio, porque anidamos cargas asíncronas en el punto neto del tiempo.

¡Pero cuidado! Todos los módulos se cargan en el punto neto del tiempo, pero no el `main.js` y sus `await`.

> Si en el `main.js` bloqueas con `await` por cargar 1 módulo mientras hay cosas que se pueden hacer sin ese módulo, estás consumiendo tiempo directamente de la experiencia de usuario.

Y JavaScript es muy bueno en ejecución asíncrona, así que no lo desaproveches, y usa estos patrones, paraleliza en el `main.js` siempre que puedas.

Es un punto donde se pierde tiempo, pero aprovechas el potencial de JavaScript.

#### Especificación 10.3: estrategia de carga asíncrona vía patrón `Event manager` o `Lifecycle pattern`

En este caso, usaríamos una API intermedia, y encajaríamos los eventos con algo tipo:

- `lifecycle.onLoaded.add(callback)`
- `events.on("loaded", callback)`
   - `events.once("loaded", callback)`
   - `events.off("loaded", callback)`

El `lifecycle` sería probablemente preferible para ahorrarse complejidad, pero `events` es correcto y reusable también.

### Especificación 11: indexación de módulos rápidos

El patrón `Pak.require("modulo.js")` busca en todos los módulos que se cargan con require. Esto implica que:

- Cada búsqueda es entre todos los módulos disponibles
- Hay una llamada expresa a un método
- No es el método más eficiente de acceso

El patrón `Pak.static.modulo` puede ayudar a indexar módulos de acceso más rápido.

A continuación se explican los casos de módulos indexados un poco más *típicos*.

Pero piensa que: estos casos son muchas veces extendibles a el mismo caso con `Pak.require(...)`, así que esta parte de la especificación es especialmente interesante para la dos:

- `Full Modulable Case Compliance` porque cubrimos todos los casos posibles o se intenta
- `Full Modulable Optimization Compliance` porque damos 1 método específico para optimizar el acceso a estos módulos

A continuación los casos típicos.

### Especificación 11.0: caso de módulo indexado simple

Este es el caso más simple de módulo indexado: **un valor cualquiera**.

Para definir módulos, indexados o no, ten en cuenta, **la abstracción más alta contiene a las inferiores**, porque debe recoger la firma que te interesa acceder en lote.

Así que empieza por las pequeñas, porque ese es el orden de carga:

```js
// static-modulo-metodo.js
module.exports = function() {
    // @whatever
};
```

```js
// static-modulo.js
Pak.static.modulo = {
    metodo: Pak.require("static-modulo-metodo.js"),
    metodo2: Pak.require("static-modulo-metodo2.js"),
};
```

De esta forma, vas indexando el acceso a las APIs rápidas, mientras mantienes el control de la estructura de dependencias en `compilation time`.

Pero hay casos más complicados que un simple `signature collection`.

#### Especificación 11.1: caso donde módulo indexado es factoría de otro módulo indexado

```js
// Pak.require("moduloFactoria.js")
Pak.static.moduloFabricado = Pak.static.moduloFactoria(...);
```

#### Especificación 11.2: caso donde módulo indexado es árbol de módulos indexados

En esto, el ejemplo es el inicial igual.

La regla es:

> La abstracción más alta contiene a las inferiores**.

Y:

> El nesteo se hace automáticamente en el `compilation-time` siempre que uses el patrón `Pak.require("ruta-a-modulo.js")`. Tú no te tienes que preocupar ya de nada más.

Pero todavía se puede complicar más. Atento al siguiente.

#### Especificación 11.3: caso donde módulo indexado generado en asíncrono es factoría de otro módulo indexado

Ponle que necesitas un factory que se carga en asíncrono para generar otro módulo indexado.

El segundo, se sobreentiende: es asíncrono.

Pero el problema ahora es que el primero, que necesitamos para el segundo, también es asíncrono.

El primero será `factoria-asincrona.js` y el segundo `metodo-estatico.js`

```js
// factoria-asincrona.js
module.exports = Pak.promise.factoriaAsincrona = (async() {
    await cargaModulos();
    await cargaPropia();
    return Pak.static.factoriaAsincrona = async function() {
        // Puede ser una función asíncrona o no, en realidad no importa,
        // lo de factoriaAsincrona viene de que la obtenemos en asíncrono
        // no de que sea una función asíncrona
        // pero para complicarlo al máximo, es una función asíncrona
    };
})();
```

Y el segundo:

```js
// Pak.require("factoria-asincrona.js")
module.exports = Pak.promise.metodoEstatico = (async() {
    await Pak.promise.factoriaAsincrona;
    // Aquí ya puedes acceder, y retornar también si quieres:
    return Pak.static.metodoEstatico = await Pak.static.factoriaAsincrona();
})();
```

La regla en este caso, pues, es la siguiente:

> Separa la `Promise` del `valor` en cada caso, no en ficheros, sino en variables diferentes. Estará `Pak.promise` de apoyo a `Pak.static`.

Sé que parece confuso, pero son los patrones que se van creando.

#### Especificación 11.4: cuándo exportar o indexar una función asíncrona y cuándo una promesa

Vale, son parece que casos raros, pero para nada, y hay que tenerlo más bien claro.

> Promesa es cuando quieres un valor.

En cambio:

> Función asíncrona es cuando quieres una fábrica de un valor.

Los 2 son módulos, solo que de distintos tipos.

Correlativos a Function y valor, AsyncFunction y Promise son.

Y vas a querer cubrir el siguiente caso también, muy interesante.

#### Especificación 11.5: cómo exportar y reusar un valor asíncrono

Vale, el caso que sería por defecto, pero que llegas a él en la casuística 5 si te pones a explicarlo. Vamos a él.

> Un valor asíncrono es la clave, porque a partir de ahí puedes nestear valores asíncronos.

Si aprendes a nestear valores asíncronos, fin del problema de la asincronicidad.

Para exportar un valor asíncrono, hay 1 problema insalvable, de una u otra forma:

- tienes que apoyarte en una promesa intermedia

Para eso está `Pak.promise.*`.

Entonces, haces este patrón:

```js
module.exports = Pak.promise.modulo = (async() {
    return Pak.static.modulo = await Promise.all([
        promesasDeModulosAnteriores(),
        cargasPropias(),
    ]);
})();
```

Lo encadenas así, o lo vas descomponiendo como más te convenga, pero la idea fundamental de exportar un valor asíncrono es esta.

Y lo siguiente es recogerlo:

```js
module.exports = (async function() {
    await Pak.promise.modulo; // Aquí lo pides
    return cargaPropia(Pak.static.modulo); // Aquí lo usas
})();
```

El patrón de `Promise` nos va a ayudar mucho en estos casos, porque se va a preocupar de lanzar la función que apendicemos en el `then` mediante el `await` si es que la promesa ya ha sido resuelta sin tener que hacer nada más.


#### Especificación 11.6: cuándo afecta la recursividad

En esta casuística:

```js
// modulo-1.js
module.exports = Pak.require("modulo-2.js");
```

Tenemos el caso 1 de 2:

```js
// modulo-2.js
module.exports = Pak.require("modulo-1.js");
```

Lanzará un error de que no encuentra, en runtime, el módulo.

Tenemos el caso 2 de 2:

```js
// modulo-2.js
// Pak.require("modulo-1.js");
module.exports = 0;
```

En esta ocasión no nos va a explotar el error.

**¿Por qué pasa así?**

Porque en compilación no evalúa, solo ordena, y no llega a encontrar la `race condition` que le llaman creo, donde el módulo 2 para cargarse necesita al 1, y el 1 necesita al 2.

**¿Qué hacer en estos casos?**

Corregirlo.

Es un error de diseño, necesariamente un módulo tiene que saberse si va después o antes que otro, siempre, en cualquier caso, y si hay un cruce recursivo, hay que revisarlo, porque debería poder resolverse.

Vamos, pienso.



