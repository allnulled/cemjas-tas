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
    - [Especificación 4: Ficheros js](#especificación-4-ficheros-js)
    - [Especificación 5: Ficheros satelitales de clase](#especificación-5-ficheros-satelitales-de-clase)

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

Las `class` de `ES06` hay que evitarlas porque rompen la **modulabilidad**.

> Con `class` puedes recuperar los métodos gracias a `Clase.prototype.metodo` pero estás obligado a importar toda la clase aunque solo quieras una parte de ella.

En su lugar se usan `object factories` que son funciones que devuelven un `Object` que ya tiene especificado su `prototype` (el método `Object.create` hace la función).

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

### Especificación 4: Ficheros js

Y los nombres de cada fichero que compone la clase importan porque de ellos depende su **modulabilidad**.

En una clase, conviene separar cada propiedad y método en fichero suelto, y hacer grupos selectivos:

- `Clase.js`: el constructor formalmente, pero la factory function que crea un objeto usando el prototype con `Object.create`.
- `Clase.prototype.js`: objeto con todas las propiedades y métodos del prototipo
- `Clase.prototype.*.js`: método dinámico
- `Clase.*.js`: método o api estática
- `Clase.*.*.js`: método de api estática

Tienes más modularidad, más agrupabilidad, más encontrabilidad, más documentabilidad, más estructura.

### Especificación 5: Ficheros satelitales de clase

Cada fichero js, clase o no, método o no, puede tener homólogos, ficheros que comparten el nombre pero no la extensión. Los ficheros homólogos oficiales de la especificación actual son:

- `*.md`: documentación adjunta
- `*.test.js`: test adjunto
- `*.*`: puedes inventarte otros, pero no serán oficiales

Esto se hace así para que en el vscode, en las pestañas, te puedas guiar por el nombre resaltado, porque si llamas a todos los ficheros `index.js` luego tienes problemas al buscar entre pestañas con el vscode.

