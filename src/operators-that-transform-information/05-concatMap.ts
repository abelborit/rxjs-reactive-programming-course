/* el concatMap() es otro operador de aplanamiento que sirve para concatenar los observables resultantes que pueden fluir a través de ese operador */
import { interval, fromEvent } from "rxjs";
import { take, switchMap, concatMap } from "rxjs/operators";

/* este interval$ emitirá valores cada 500ms pero solo serán 3 emisiones por ek take(3) */
const interval$ = interval(1000).pipe(take(3));

/* para controlar por observables los eventos del document en base al evento click */
const click$ = fromEvent(document, "click");

/* con el concatMap() se irá concatenando los observables pero cuando las emisiones dadas por el observable anterior ya se hayan completado */
click$
  .pipe(
    // switchMap(() => interval$)
    concatMap(() => interval$)
  )
  .subscribe((response) => console.log("response", response));

/* con concatMap() */
/* 
haciendo 1 click dará: 0, 1, 2
haciendo 1 click y luego otro click rápidamente cuando se haya emitido el 0 dentro del rango de 1000ms dará: 0, 1, 2 --> 0, 1, 2
haciendo 1 click y luego otro click rápidamente cuando se haya emitido el 0 y luego otro click rápidamente cuando se haya emitido el 1 dentro del rango de 1000ms dará: 0, 1, 2 --> 0, 1, 2 --> 0, 1, 2
*/

/* con switchMap() */
/* 
haciendo 1 click dará: 0, 1, 2
haciendo 1 click y luego otro click rápidamente cuando se haya emitido el 0 dentro del rango de 1000ms dará: 0 --> 0, 1, 2
haciendo 1 click y luego otro click rápidamente cuando se haya emitido el 0 y luego otro click rápidamente cuando se haya emitido el 1 dentro del rango de 1000ms dará: 0 --> 0, 1 --> 0, 1, 2
*/
