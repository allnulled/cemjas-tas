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
  - [Especificación](#especificación)
    - [Especificación 1: El loop booster](#especificación-1-el-loop-booster)
    - [Especificación 2: Los entry points](#especificación-2-los-entry-points)
      - [Especificación 2.1: Requerimientos de los entry points](#especificación-21-requerimientos-de-los-entry-points)
    - [Especificación 3: Ficheros de una clase descomponible](#especificación-3-ficheros-de-una-clase-descomponible)
      - [Especificación 3.1: cuándo sí usar class de ES06](#especificación-31-cuándo-sí-usar-class-de-es06)
      - [Especificación 3.2: cómo replicar todo el comportamiento de class](#especificación-32-cómo-replicar-todo-el-comportamiento-de-class)
      - [Especificación 3.3: herencia de rasgos al estilo Dart](#especificación-33-herencia-de-rasgos-al-estilo-dart)
      - [Especificación 3.4: Fully Modulable Inheritance Compliance](#especificación-34-fully-modulable-inheritance-compliance)
    - [Especificación 4: Ficheros js](#especificación-4-ficheros-js)
    - [Especificación 5: Ficheros satelitales al js](#especificación-5-ficheros-satelitales-al-js)
    - [Especificación 6: Soporte para tests rápidos](#especificación-6-soporte-para-tests-rápidos)
    - [Especificación 7.1: Test Framework Provision Compliance](#especificación-71-test-framework-provision-compliance)
    - [Especificación 7.2: Test-Per-File Development Compliance](#especificación-72-test-per-file-development-compliance)
    - [Especificación 7: Errores detallados](#especificación-7-errores-detallados)

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

#### Especificación 2.1: Requerimientos de los entry points

- El `bin` se espera que tenga un comando para despertar a 1 servidor único.
- El `server` se espera que sea único por sistema y reutilice los recursos entre cargas.
- El `client` se espera que sea basado en `socket-io.client.js` y vale igual para `nodejs` y `gui`.
- El `gui` se espera que sea tipo web normal

### Especificación 3: Ficheros de una clase descomponible

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

#### Especificación 3.4: Fully Modulable Inheritance Compliance

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

### Especificación 4: Ficheros js

Y los nombres de cada fichero que compone la clase importan porque de ellos depende su **modulabilidad**.

En una clase, conviene separar cada propiedad y método en fichero suelto, y hacer grupos selectivos:

- `Clase.js`: la función constructora + su `prototype` modificado.
- `Clase.constructor.js`: la función constructora.
- `Clase.prototype.js`: objeto con todas las propiedades y métodos del prototipo
- `Clase.prototype.*.js`: método dinámico
- `Clase.*.js`: método o api estática
- `Clase.*.*.js`: método de api estática

Tienes más modularidad, más agrupabilidad, más encontrabilidad, más documentabilidad, más estructura.

### Especificación 5: Ficheros satelitales al js

Cada fichero js, clase o no, método o no, puede tener homólogos, ficheros que comparten el nombre pero no la extensión. Los ficheros homólogos oficiales de la especificación actual son:

- `*.md`: documentación adjunta
- `*.test.js`: test adjunto
- `*.*`: puedes inventarte otros, pero no serán oficiales

Esto se hace así para que en el vscode, en las pestañas, te puedas guiar por el nombre resaltado, porque si llamas a todos los ficheros `index.js` luego tienes problemas al buscar entre pestañas con el vscode.

### Especificación 6: Soporte para tests rápidos

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

### Especificación 7.1: Test Framework Provision Compliance

La **TFP-Com o Test Framework Provision Compliance** obliga a tener 1 framework para tests por lo menos.

- El módulo `src/cem/tester/TestCollection.js` se encarga de la capa programática (o API).
   - Toolkit básico para testing desde programa
- El comando `pak test fichero.js` y `pak test --all` se encarga de la capa operativa (o CLI).
   - Comando básico para testing desde sistema operativo

### Especificación 7.2: Test-Per-File Development Compliance

La **TPFD-Com o Test-Per-File Development Compliance** obliga a dar la opción de testear cada fichero `js` con su propio test.

- El comando `pak test fichero.js` y `pak test --all` se encarga de la capa operativa (o CLI).
   - Permite con `--all` lanzar todos los comandos que:
      - Empiecen con `test/**/*.js`
      - Acaben con `**/*.test.js`

### Especificación 7: Errores detallados

Los errores de la aplicación pasan a consistir en un JSON que indica todos los detalles necesarios para informar del error.

La forma de lanzar errores pasa a ser:

```js
throw Pak.require("src/cem/error/ErrorData.js").create({ detalle1: 1, detalle2: 2 })
```