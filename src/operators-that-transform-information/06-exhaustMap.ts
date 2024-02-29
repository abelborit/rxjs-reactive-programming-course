/* el exhaustMap() es otro operador de aplanamiento que nos puede ser útil cuando tenemos elementos que puedan hacer mucho SPAM o están lanzando muchos eventos rápidamente, por ejemplo, si se tiene un botón y el usuario presiona muchas veces ese botón entonces solo emitirá cuando la suscripción interna previa se haya terminado, en un formulario cuando se presiona submit con la tecla enter y se presiona varias veces la tecla enter entonces nos evitamos problemas de un doble submit, etc.... */
import { interval, fromEvent } from "rxjs";
import { take, exhaustMap } from "rxjs/operators";

/* este interval$ emitirá valores cada 500ms pero solo serán 3 emisiones por ek take(3) */
const interval$ = interval(1000).pipe(take(3));

/* para controlar por observables los eventos del document en base al evento click */
const click$ = fromEvent(document, "click");

/* con el exhaustMap() se irán emitiendo valores por el observable inicial lo cual a esa emisión se suscribirá y emitirá sus valores que serán mostrados en la salida pero pero si se realiza una nueva emisión por el observable inicial y el primer observable aún no terminó de emitir todos sus valores entonces simplemente lo ignora hasta que termine la primera parte, luego si se realiza una nueva emisión por el observable inicial y ve que no hay emisiones pendientes entonces va a haber un nuevo observable con su suscripción que irá emitiendo valores mostrados en su salida del observable inicial y así sucesivamente */
click$
  .pipe(exhaustMap(() => interval$))
  .subscribe((response) => console.log("response", response));

/* con exhaustMap() */
/* 
haciendo 1 click dará: 0, 1, 2
haciendo 1 click y luego otro click rápidamente cuando se haya emitido el 0 dentro del rango de 1000ms dará: 0, 1, 2
haciendo 1 click y luego cuando termine hacer otro click dará: 0, 1, 2 --> 0, 1, 2
haciendo 1 click y luego cuando termine hacer otro click dará y luego otro click rápidamente cuando se haya emitido el 0 dentro del rango de 1000ms dará:: 0, 1, 2 --> 0, 1, 2
*/
