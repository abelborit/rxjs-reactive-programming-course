import { fromEvent, interval } from "rxjs";
import { mergeMap, switchMap } from "rxjs/operators";

const click$ = fromEvent(document, "click");
const interval$ = interval(1000);

click$
  .pipe(
    switchMap(() => interval$)
    // mergeMap(() => interval$)
  )
  .subscribe((response) => console.log("response", response));

/* 
    - con el mergeMap() se siguen emitiendo los valores al hacer click, por ejemplo, si hacemos un primer click y pasan tres segundos entonces veremos un 0, 1, 2 pero si luego hacemos un click entonces hay otra emisión de observables lo cual veremos de nuevo un 0, 1, 2, ..... y los valores del primero observable
    - con el switchMap() se siguen emitiendo los valores al hacer click pero al hacer un primer click y pasan tres segundos entonces veremos un 0, 1, 2 pero si luego hacemos un click entonces la suscripción anterior se completará y veremos de nuevo un 0, 1, 2, ...... y así sucesivamente, es decir, solo se mostrará la última emisión de la suscripción interna del observable
*/
