/* el operador sample(second_observable) emite el último valor emitido por el first_observable hasta que el observable que está dentro del operador sample(), que es el second_observable, emita un valor. Por ejemplo, tenemos dos observables que son first_observable y second_observable y en mi sample es así sample(second_observable), entonces si first_observable emite A y luego second_observable emite algo entonces recién se recibe el A, luego si first_observable emite un B pero second_observable no emite nada y después first_observable emite un C y second_observable emite algo entonces se recibe el C y así sucesivamente y se completa hasta que el first_observable o el observable el cual estamos suscritos se completa */
import { interval, fromEvent } from "rxjs";
import { sample } from "rxjs/operators";

/* es el primer observable que está emitiendo valores en un intervalo de 500ms */
const interval$ = interval(500);
const click$ = fromEvent(document, "click");

/* cada que se haga click, es decir, cada que se emitan valores del observable click$ entonces recién se mostrarán los valores emitidos por interval$ (incluso si este ya estaba emitiendo valores pero recién serán recibidos y mostrados) */
interval$.pipe(sample(click$)).subscribe(console.log);
