/* range() es una función nos permite crear observables que emite una secuencia de números en base a un rango. Por defecto son síncronos pero se pueden transformar en asíncronos usando asyncScheduler. Por ejemplo si tenemos range(1, 5) entonces emitirá valores del 1 al 5 y cuando llegue al 5 se completará */
import { asyncScheduler, observeOn, range, scheduled } from "rxjs";

/* range(valor inicial, # de emisiones que se harán desde el valor inicial) */
const source1$ = range(1, 5);
const source2$ = range(-5, 10); // iría desde el -5 y luego 10 emisiones en adelante, es decir, sería: -5, -4, -3, ...... 4 haciendo un total de 10 emisiones
const source3$ = range(1, 5).pipe(observeOn(asyncScheduler)); // convirtiéndolo de forma asíncrona con .pipe(observeOn(asyncScheduler)) (https://rxjs.dev/guide/scheduler)
const source4$ = scheduled(range(1, 5), asyncScheduler); // convirtiéndolo de forma asíncrona usando scheduled() (https://rxjs.dev/deprecations/scheduler-argument)

console.log("Inicio del proceso 1");
source1$.subscribe({
  next: (value) => console.log("next 1:", value),
  error: (error) => console.warn("error 1:", error),
  complete: () => console.info("complete source1$: range()"),
});
console.log("Fin del proceso 1");

console.log("Inicio del proceso 2");
source2$.subscribe({
  next: (value) => console.log("next 2:", value),
  error: (error) => console.warn("error 2:", error),
  complete: () => console.info("complete source2$: range()"),
});
console.log("Fin del proceso 2");

/* como está de forma asíncrona entonces primero ejecutará los console.log() que son parte del hilo principal de JavaScript y luego la funcionalidad del observable ya que estará desenlazado del hilo principal de la aplicación */
console.log("Inicio del proceso 3");
source3$.subscribe({
  next: (value) => console.log("next 3:", value),
  error: (error) => console.warn("error 3:", error),
  complete: () => console.info("complete source3$: range()"),
});
console.log("Fin del proceso 3");

/* como está de forma asíncrona entonces primero ejecutará los console.log() que son parte del hilo principal de JavaScript y luego la funcionalidad del observable ya que estará desenlazado del hilo principal de la aplicación */
console.log("Inicio del proceso 4");
source4$.subscribe({
  next: (value) => console.log("next 4:", value),
  error: (error) => console.warn("error 4:", error),
  complete: () => console.info("complete source4$: range()"),
});
console.log("Fin del proceso 4");
