/* el combineLatest() es una función que nos permite mandar observables como argumentos, luego pcombinarlos y emitir los valores de todos los observables internos de una forma simultánea. El combineLatest() regresa un nuevo observable que va a emitir valores hasta que todos los observables internos hayan emitido por lo menos un valor. Los observables que se le envían tienen que estar en un array o como objeto (https://rxjs.dev/deprecations/array-argument) Se tiene que completar ambos observables para completar toda la suscripción, si se completa uno y falta el otro entonces se seguirán recibiendo valores con los últimos valores emitidos */

/* el combineLatestWith() crea un observable que combina los valores más recientes de todos los observables pasados y la fuente en matrices y los emita. Devuelve un observable, que cuando se suscribe, se suscribirá al observable inicial y a todas los observable proporcionados como argumentos. Una vez que todas los observable emitan al menos un valor, todos los valores más recientes se emitirán como un array. Después de eso, cada vez que un observable emita un valor, todos los valores más recientes se emitirán como un array */

/* ************************************************************************************************************************ */
/* ************************************************************************************************************************ */

/* ***** EJEMPLO 1 con combineLatest([]) ***** */
// import { fromEvent, combineLatest } from "rxjs";
// import { map, take } from "rxjs/operators";

// const keyup$ = fromEvent(document, "keyup");
// const click$ = fromEvent(document, "click");

// /* tiene que emitir mínimo un valor cada observable para que se reciban valores en la suscripción y mediante se hagan las emisiones de los observables entonces aparecerá en un arreglo según el orden en que se hayan emitido */
// combineLatest([
//   keyup$.pipe(
//     map((event) => event.type),
//     take(5) // para que se emita cinco vez
//   ),
//   click$.pipe(
//     map((event) => event.type),
//     take(5) // para que se emita cinco vez
//   ),
// ]).subscribe({
//   next: (response) => console.log("combineLatest", response),
//   complete: () => console.log("complete"), // cuando ambos se completen entonces se completa toda la suscripción
// });

/* ************************************************************************************************************************ */
/* ************************************************************************************************************************ */

/* ***** EJEMPLO 1 con combineLatestWith([]) ***** */
// import { fromEvent } from "rxjs";
// import { combineLatestWith, map, take } from "rxjs/operators";

// const keyup$ = fromEvent(document, "keyup");
// const click$ = fromEvent(document, "click");

// /* tiene que emitir mínimo un valor cada observable para que se reciban valores en la suscripción y mediante se hagan las emisiones de los observables entonces aparecerá en un arreglo según el orden en que se hayan emitido */
// click$
//   .pipe(
//     map((event) => event.type), // map del observable click$
//     take(5), // para que se emita cinco vez
//     combineLatestWith(
//       keyup$.pipe(
//         map((event) => event.type), // map del observable keyup$
//         take(5) // para que se emita cinco vez
//       )
//     ),
//     map(([event1, event2]) => console.log({ event1, event2 })) // retorna las emisiones de ambos observables
//   )
//   .subscribe({
//     next: (response) => console.log("combineLatestWith", response),
//     complete: () => console.log("complete"), // cuando ambos se completen entonces se completa toda la suscripción
//   });

/* ************************************************************************************************************************ */
/* ************************************************************************************************************************ */

/* ***** EJEMPLO 2 con combineLatest([]) ***** */
// import { combineLatest, fromEvent, map } from "rxjs";

// const input1 = document.createElement("input");
// const input2 = document.createElement("input");

// input1.placeholder = "email@gmail.com";
// input2.placeholder = "*********";
// input2.type = "password";

// document.getElementById("app")?.append(input1, input2);

// /* Helper */
// const getInputStream = (element: HTMLElement) =>
//   fromEvent<KeyboardEvent>(element, "keyup").pipe(
//     map<KeyboardEvent, string>((event) => {
//       /* FORMA 1 */
//       // return (<HTMLInputElement>event.target).value;

//       /* FORMA 2 */
//       // const eventTarget = event.target as HTMLInputElement;
//       // return eventTarget.value;

//       /* FORMA 3 */
//       return (event.target as HTMLInputElement).value;
//     })
//   );

// combineLatest([getInputStream(input1), getInputStream(input2)]).subscribe({
//   next: (response) => console.log("combineLatest", response),
//   complete: () => console.log("complete"), // cuando ambos se completen entonces se completa toda la suscripción
// });

/* ************************************************************************************************************************ */
/* ************************************************************************************************************************ */

/* ***** EJEMPLO 2 con combineLatestWith([]) ***** */
import { combineLatestWith, fromEvent, map } from "rxjs";

const input1 = document.createElement("input");
const input2 = document.createElement("input");

input1.placeholder = "email@gmail.com";
input2.placeholder = "*********";
input2.type = "password";

document.getElementById("app")?.append(input1, input2);

const input1$ = fromEvent(input1, "keyup");
const input2$ = fromEvent(input2, "keyup");

input1$
  .pipe(
    map((event) => {
      /* FORMA 1 */
      // return (<HTMLInputElement>event.target).value;

      /* FORMA 2 */
      // const eventTarget = event.target as HTMLInputElement;
      // return eventTarget.value;

      /* FORMA 3 */
      return (event.target as HTMLInputElement).value;
    }),
    combineLatestWith(
      input2$.pipe(
        map((event) => {
          /* FORMA 1 */
          // return (<HTMLInputElement>event.target).value;

          /* FORMA 2 */
          // const eventTarget = event.target as HTMLInputElement;
          // return eventTarget.value;

          /* FORMA 3 */
          return (event.target as HTMLInputElement).value;
        })
      )
    )
  )
  .subscribe({
    next: (response) => console.log("combineLatestWith", response),
    complete: () => console.log("complete"), // cuando ambos se completen entonces se completa toda la suscripción
  });
