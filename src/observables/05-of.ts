/* of() es una función nos permite crear observables en base a un listado de elementos. El of() emitirá los valores en secuencia, uno por uno, de manera síncrona y cuando ya emite el último valor automáticamente se completa el observable */
import { of } from "rxjs";

/* es importante separarlos por comas (,) ya que eso indica que son elemenos separados */
const observable1$ = of(1, 2, 3, 4, 5, 6); // se mostrarán los 6 elementos uno tras otro
const observable2$ = of([1, 2, 3], [4, 5, 6]); // se mostrarán los 2 arrays uno tras otro ya que el of() solo tiene dos elementos separados por coma (,)
const observable3$ = of(...[1, 2, 3], ...[4, 5, 6]); // como se está usando el spread operator entonces dará el mismo resultado que el observable1$
const observable4$ = of(
  [1, 2],
  { a: 1, b: 2 },
  function () {},
  true,
  Promise.resolve(true)
);

/* como el of() emite los valores de forma síncrona entonces veremos que se ejecutará de la siguiente forma:
    1. console.log("Inicio del proceso");
    2. observable$.subscribe(.....)
    3. console.log("Fin del proceso");
*/
console.log("Inicio del proceso");
/* como of() es un observable entonces tenemos que suscribirnos para que empiece a emitir valores */
observable1$.subscribe({
  next: (value) => console.log("next:", value),
  error: (error) => console.warn("error:", error),
  complete: () => console.info("complete observable: of()"),
});
console.log("Fin del proceso");
console.info("*************************");

observable2$.subscribe({
  next: (value) => console.log("next 2:", value),
  error: (error) => console.warn("error 2:", error),
  complete: () => console.info("complete observable 2: of()"),
});
console.info("*************************");

observable3$.subscribe({
  next: (value) => console.log("next 3:", value),
  error: (error) => console.warn("error 3:", error),
  complete: () => console.info("complete observable 3: of()"),
});
console.info("*************************");

observable4$.subscribe({
  next: (value) => console.log("next 4:", value),
  error: (error) => console.warn("error 4:", error),
  complete: () => console.info("complete observable 4: of()"),
});
console.info("*************************");
