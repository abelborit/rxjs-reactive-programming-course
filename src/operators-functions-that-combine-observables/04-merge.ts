/* el merge() es otra función que recibe uno o más observables y el resultado será un nuevo observable del producto de ambos observables combinados simultáneamente pero se tienen que completar ambos observables para poder completar todo el subscribe */
import { fromEvent, merge } from "rxjs";
import { map, take } from "rxjs/operators";

const keyup$ = fromEvent(document, "keyup");
const click$ = fromEvent(document, "click");

merge(
  keyup$.pipe(
    map((event) => event.type),
    take(1) // para que se emita una vez
  ),
  click$.pipe(
    map((event) => event.type),
    take(1) // para que se emita una vez
  )
).subscribe({
  next: (response) => console.log(response),
  complete: () => console.log("complete"), // cuando ambos se completen entonces se completa toda la suscripción
});
