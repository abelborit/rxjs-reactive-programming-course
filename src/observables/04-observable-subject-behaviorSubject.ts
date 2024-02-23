/* Observable vs BehaviorSubject / Subject: https://levioconsulting.com/insights/intro-to-rxjs-in-angular-observables-subjects-and-behaviorsubjects/#:~:text=Subjects%20are%20a%20type%20of%20Observable.&text=The%20way%20to%20differentiate%20a,last%20emitted%20value%20upon%20subscription. */

/* ***** BehaviorSubject ***** */
import { BehaviorSubject, Observable } from "rxjs";
/* En Angular, se recomienda usarlo BehaviorSubjectpara transferir datos, ya que un Servicio a menudo se inicializa antes que un componente. BehaviorSubject garantiza que el componente que consume el Servicio reciba los últimos datos actualizados, incluso si no hay nuevas actualizaciones, debido a la suscripción del componente al Servicio. */

/* 'A' es el valor inicial. Si hay una Suscripción después, inmediatamente obtendrá el valor 'A'. */
const beSubject = new BehaviorSubject("beSubject - a");

beSubject.next("beSubject - b");

beSubject.subscribe((value) => {
  /* Suscripción recibida B. Porque al emitir un valor b con el .next() y luego suscribirse entonces obtendrá el último valor antes de la suscripción. Esto no sucedería para un Observable o Subject de forma predeterminada. */
  console.log("Subscription received the value ", value);
});

/* Suscripción recibida C */
beSubject.next("beSubject - c");

/* Suscripción recibida D */
beSubject.next("beSubject - d");

/* ************************************************************************************************************************ */

/* ***** Subject ***** */
import { Subject } from "rxjs";
const subject = new Subject();

subject.next("subject - b");

subject.subscribe((value) => {
  /* La suscripción no recibirá nada en este momento ya que no recibe eventos previos, solo los valores después de realizar la suscripción */
  console.log("Subscription received the value ", value);
});

/* Suscripción recibida C */
subject.next("subject - c");

/* Suscripción recibida D */
subject.next("subject - d");

/* ************************************************************************************************************************ */

/* ***** Observable ***** */
/* Una diferencia muy muy importante dado que el Observable es solo una función, no tiene ningún estado, por lo que para cada nuevo Observador ejecuta el código de creación observable una y otra vez. Esto resulta en: "El código se ejecuta para cada observador, por ejemplo, si se hace una llamada HTTP en el observable, esta llamada se llama para cada observador." Esto causa errores e ineficiencias importantes. BehaviorSubject o Subject almacena los detalles del observador, ejecuta el código solo una vez y proporciona el resultado a todos los observadores. */

// --- Observable ---
/* Las interfaces Observer y Observable proporcionan un mecanismo generalizado para notificaciones push, también conocido como patrón de diseño de observador. El objeto Observable representa el objeto que envía notificaciones (el proveedor); el objeto Observador representa la clase que los recibe (el observador) */
let randomNumGenerator1 = new Observable((observer) => {
  observer.next(Math.random());
});

/* estos observer1 y observer2 darán resultados DIFERENTES */
let observer1 = randomNumGenerator1.subscribe((num) =>
  console.log("observer 1: " + num)
);

let observer2 = randomNumGenerator1.subscribe((num) =>
  console.log("observer 2: " + num)
);

// ------ BehaviorSubject / Subject
/* La clase BehaviorSubject / Subject hereda tanto Observable como Observador, en el sentido de que es a la vez observador y observable. Puede utilizar un BehaviorSubject / Subject para suscribir a todos los observadores y luego suscribir el BehaviorSubject / Subject a una fuente de datos, es decir, puede publicar o enviar eventos/cambios usando .next() a un BehaviorSubject / Subject y escuchar cambios usando subscribe() a un BehaviorSubject / Subject */
let randomNumGenerator2 = new BehaviorSubject(0);
let observer0Subject = randomNumGenerator2.subscribe((num) =>
  console.log("observer subject 0: " + num)
);

randomNumGenerator2.next(Math.random());

/* estos observer1Subject y observer2Subject darán resultados IGUALES */
let observer1Subject = randomNumGenerator2.subscribe((num) =>
  console.log("observer subject 1: " + num)
);

let observer2Subject = randomNumGenerator2.subscribe((num) =>
  console.log("observer subject 2: " + num)
);

console.log({ observer1, observer2 });
console.log({ observer0Subject, observer1Subject, observer2Subject });

/* 
- Observable
  - Es solo una función, no tiene estado
  - no se pueden enviar valores a un Observable usando el método .next()
  - Ejecución de código para cada observador
  - Crea solo Observable (solo productor de datos)
  - Cold Observables: el código se ejecuta o empieza a emitir cuando tienen al menos un observador, es decir, son aquellos que no emiten valores hasta que alguien está suscrito a ellos
  - Crea una copia de los datos: Observable crea una copia de los datos para cada observador
  - Uso: 
      * Observable simple con un solo observador.

- BehaviorSubject / Subject 
  - Se puede crear un Observable a partir de ambos Subjecty BehaviorSubject; Por ejemplo, subjectName.asObservable().
  - Tiene estado. Almacena datos en la memoria
  - Ejecución del mismo código sólo una vez para todos los observadores
   - Hot Observables: el código se ejecuta o empieza a emitir independientemente si tiene un observador, es decir, emite valores así alguien esté suscrito o no
  - Puede crear y también escuchar Observable (productor y consumidor de datos)
  - Uso:
      * Almacenar datos y modificarlos con frecuencia.
      * Múltiples observadores escuchan los datos.
      * Proxy entre Observable y Observador
*/

/* ************************************************************************************************************************ */
/* 
Los Subject son excelentes cuando desea emitir un evento donde el estado del evento no es importante, es decir, no es importante que los suscriptores del evento conozcan los valores emitidos anteriormente.

Los BehaviorSubject son todo lo contrario, son útiles si hay un "estado" actual del evento al que desea que todos los suscriptores puedan acceder.

Los Observables son útiles para exponer Subjects / BehaviorSubjects a otras partes de la aplicación y al mismo tiempo ocultan la capacidad de emitir valores/cambios.
*/
