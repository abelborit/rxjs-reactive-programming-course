/* el operador mergeMap(value => new_observable) tiene una función que recibe el valor que ha emitido nuestro observable inicial y regresa un nuevo observable. Los operadores de aplanamiento cuando reciben un observable no transmiten ese observable al siguiente operador o a la suscripción, sino que lo que fluye es el valor de la suscripción interna de ese observable */
/* El operador mergeMap() se utiliza para transformar los valores emitidos por un observable en otros observables, y luego aplanar esos observables internos en uno solo. Esto significa que cada valor emitido por el observable fuente se mapeará a un nuevo observable, y los valores emitidos por estos observables internos se "aplanarán" en un único flujo observable. */
import { of, interval, fromEvent } from "rxjs";
import { mergeMap, take, map, takeUntil, tap } from "rxjs/operators";

const letras$ = of("a", "b", "c");

letras$.pipe(
  /* este mergeMap(letra) generará un observable por cada letra que haya, en este caso habrán 3 observables y con el interval(1000) entonces cada segundo estará emitiendo 3 observables, luego al ser un observable entonces se le pasará por un pipe() */
  mergeMap((letra) =>
    interval(1000).pipe(
      map((intervalNumber) => letra + " - " + intervalNumber),
      take(3)
    )
  )
);
// .subscribe({
//   next: (val) => console.log("next:", val),
//   complete: () => console.log("Complete"),
// });

const mousedown$ = fromEvent(document, "mousedown");
const mouseup$ = fromEvent(document, "mouseup");
const interval$ = interval();

/* al hacer click para tomar el tiempo que el usuario hizo click y se detendrá cuando se emita un valor de levantar el click */
mousedown$
  .pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$))))
  .subscribe(console.log);

/* Ejemplo para obtener el tiempo en milisegundos en el que está pulsado el mouse */
mousedown$
  .pipe(
    map((event) => event.timeStamp),
    tap({
      next: (inicio) => console.log("inicio: ", inicio),
    }),
    mergeMap((inicio) =>
      mouseup$.pipe(
        map((event) => event.timeStamp),
        tap({
          next: (fin) => console.log("fin:", fin),
        }),
        map((fin) => fin - inicio),
        take(1)
      )
    )
  )
  .subscribe({
    next: (result) => console.log("**Tiempo**", result),
  });

/* ************************************************************************************************************************ */
/* ¿Cuál es la diferencia tiene el mergeAll y el mergeMap? */
/* 
Son muy parecidos pues ambos son operadores de aplanamiento que combina todos los observables que se emiten, pero:

  - El mergeAll() fusionará todos los observables sin recibir parámetros y vas a obtener los datos propagados combinados.
  - El mergeMap() recibe como parámetro cada valor que emite el observable de origen y crea un nuevo observable interno, luego como resultado final o de salida aplana todos esos observables internos para combinar o fusionar los datos. En palabras menos técnicas, primero mapea y luego aplana.
*/
