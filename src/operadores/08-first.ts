/* el operador first() emite el primero valor y luego se completa al emitir ese primer valor y no importa si hay otras emisiones después, pero si le colocamos una configuración como una función que tenga una condición como first(x => x > 10) entonces aquí se completará a penas x sea mayor a 10 */
import { fromEvent } from "rxjs";
import { first, tap, map /* , take  */ } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

/* FORMA 1: usando take(1) */
// click$.pipe(take(1)).subscribe({
//   next: (value) => console.log("next:", value),
//   complete: () => console.log("complete"),
// });

/* FORMA 2: usando first() */
// click$.pipe(first()).subscribe({
//   next: (value) => console.log("next:", value),
//   complete: () => console.log("complete"),
// });

click$
  .pipe(
    tap<PointerEvent>((response) => console.log("tap()", response)),
    // map( event => ({
    //     clientY: event.clientY,
    //     clientX: event.clientX
    // }) )
    map(({ clientX, clientY }) => ({ clientY, clientX })), // map(({ clientX, clientY }) => { return {clientX, clientY} },
    first((event) => event.clientY >= 150)
  )
  .subscribe({
    next: (value) => console.log("next:", value),
    complete: () => console.log("complete"),
  });
