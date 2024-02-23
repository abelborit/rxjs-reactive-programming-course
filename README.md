# Vanilla TypeScript - RxJS Reactive Programming Course

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

1. Primera parte: **Conceptos generales**

   - Conceptos generales de RxJs y las extensiones reactivas
   - ¿Qué es ReactiveX?
   - ¿Cómo funciona?
   - ¿Qué es el patrón observable?

2. Segunda parte: **Observables**

   - Observers
   - Subscriber
   - Unsubscribe
   - Subjects
   - Hot y Cold Observables
   - Observables en cadena

3. Tercera parte: **Funciones para crear Observables**

   - of
   - fromEvent
   - interval
   - timer
   - asyncScheduler

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- RxJS: https://rxjs.dev/guide/installation
  - `npm install rxjs`
- ReactiveX Documentations:
  - https://reactivex.io/documentation/observable.html
  - https://rxjs-dev.firebaseapp.com/api
- ejemplo

### \* NOTAS:

- **¿Por qué usar extensiones reactivas?**

  - Una respuesta sencilla sería "porque todos queremos tener información en tiempo real" por ejemplo, estamos en Twitter y obviamente queremos tener los últimos tweets exactamente en el momento que son emitidos, otro ejemplo, si estamos en alguna aplicación que trabaja con precios obviamente vamos a querer saber el precio en el momento en que cambia, etc.
  - Nosotros vamos a querer que nuestra aplicación pueda hacer peticiones a la red y a su vez seguir haciendo interacciones con la interfaz de usuario y que cuando se retorna la información de una API por ejemplo nosotros podamos actualizar la interfaz de usuario para poder mostrar cambios dinámicos en tiempo real al mismo. Todo esto sin que la aplicación se sienta que se congela o que su rendimiento decae considerablemente. Esto nos lleva a una pregunta muy interesante ¿Cuándo usar extensiones reactivas?
    - Para manejar cualquier evento de la interfaz de usuario
    - Cuando es necesario notificar sobre cambios en un objeto o varios objetos
    - Cuando trabajamos con comunicación por sockets
    - Cuando necesitamos trabajar con flujos de información (streams)

- **Piezas fundamentales de la programación reactiva:**

  - `Observables`
    - Es la pieza fundamental de las extensiones reactivas
    - Es la fuente de información
    - Puede emitir varios valores (puede emitir uno o ningún valor)
    - Puede emitir errores
    - Pueden ser finitos o infinitos
    - Pueden ser síncronos o asíncronos (aunque su fuerte es trabajar de forma asíncrona)
  - `Subscribers / Suscriptores`
    - Los subscribers se suscriben a un observable, es decir, estar pendientes de lo que realiza el observable
    - Consumen u observan la data que proviene del observable
    - Pueden recibir los errores y eventos del observable
    - Desconocen todo lo que se encuentra detrás en el observable, es decir, desconocen si la información viene filtrada, transformada, viene de alguna otra fuente, pasó por varios lugares, etc. No les importa eso a los subscribers
    - Al suscribirnos al Observable se pueden obtener 3 metodos: next, error y complete
  - `Operators / Operadores`
    - Pieza fundamental de las extensiones reactivas y aquí es donde se puede mostrar todo el poder de las extensiones reactivas
    - Utilizados para transformar observables (map, group, scan.....)
    - Utilizados para filtrar observables (filter, distinct, skip, debounce.....)
    - Utilizados para combinar observables
    - Utilizados para crear nuevos observables

- **Beneficios de la programación reactiva:**

  - Evitar el "Callback Hell" (callbacks dentro de callbacks)
  - Trabajar de forma simple tareas síncronas y asíncronas
  - Uso de operadores para reducir y simplificar el trabajo
  - Es fácil transformar los flujos o streams de información en lo que nosotros necesitemos
  - Código más limpio y fácil de leer
  - Fácil de implementar, lo difícil podría ser decidir y/o escoger el operador para resolver el problema de la mejor forma
  - Fácil anexar procedimientos sin alterar el producto final

- **¿Cuándo usar promesa (async/await) o rxjs Observable?**

  - Básicamente podemos usar observables en cualquier lugar donde se use promesas, pero los observables tienen funciones que no existen dentro de las promesas. Digamos que los observables + operadores, expanden la forma de usarlo enormemente, sin contar que puedes cancelar los observables, mutarlos y prácticamente cualquier cosa.
  - Ahora, las promesas tienen una característica importante, que aparte de ayudar con tareas asíncronas, tienen el async/await y lo mejor es que no se tiene que importar nada para usarlas, ya vienen en las versiones actuales de JavaScript. Usar y conocer las promesas es como conocer cualquier otra instrucción de JavaScript, ya que es parte del código.
  - Los Observables y en sí tal cual "Rx", es una librería adicional que expande las características de JavaScript. ¿Cuándo usar uno o el otro? Depende mucho de lo que se quiera hacer por ejemplo, si se necesita estar mutando mucho las respuestas que se recibe entonces posiblemente sea conveniente usar los observables y operadores, pero si lo que se necesita hacer se resuelve con promesas entonces se pensaría en usar las promesas.

- **¿Qué es ReactiveX y cómo funciona?**

  - ReactiveX es una API para programación asíncrona usando observables. En su página oficial dicen que son "el patrón observer hecho de la forma correcta" Dicen que son la combinación de las mejores ides del patrón observer, del patrón iterador y de la programación funcional.

    - `Patrón Observer`
      - Es un patrón de diseño de software que define una dependencia del tipo uno a muchos entre objetos, de manera que cuando uno de los objetos cambia su estado notifica este cambio a todos los dependientes. EN RESUMEN **Notifica cuando sucen cambios y puede ser de uno a muchos.**
    - `Patrón Iterador`
      - En POO (Programación Orientada a Objetos), el patrón iterador define una interfaz que declara los métodos necesarios para acceder secuencialmente a un grupo de objetos de una colección. En pocas palabras, sería crear funciones o métodos que nos permitan saber cuál es el primer elemento, siguiente elemento, si hay más elementos, el elemento actual, etc. EN RESUMEN **Poder ejecutar operaciones de forma secuencial para cumplir una tarea.**
    - `Programación Funcional`
      - Es crear un conjunto de funciones que tengan un objetivo específico, es decir, si tengo una función que recibe "A" y retorna "A + 1", siempre que yo llame a esa función retornará "A + 1" sin efectos secundarios y sin mutar la data. Esto es indispensable porque sabemos que en JavaScript, así como en otros lenguajes de programación, todos los objetos pasan por referencia y RX o Reactive Extensions previene que estos objetos muten de manera accidental cuando transformamos la data con operadores o bien que simplemente la data fluya a través de ese observable. EN RESUMEN **Tener funciones con tareas específicas que reciban argumentos y no muten la información.**
