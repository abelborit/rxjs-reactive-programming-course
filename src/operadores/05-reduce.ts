/* el operador reduce() hace lo mismo que hace el reduce() de JavaScript, es decir, aplica una función acumuladora a las emisiones producidas a mi observable. IMPORTANTE: Al momento de que mi observable se completa recién tendremos el valor acumulado */
import { interval } from "rxjs";
import { reduce, take, tap } from "rxjs/operators";

/* TRABAJARLO MEDIANTE JAVASCRIPT */
const numberArray = [1, 2, 3, 4, 5];

/* FORMA 1: lógica separada */
const totalReduce = (accumulator: number, currentValue: number) => {
  return accumulator + currentValue;
};
const total = numberArray.reduce(totalReduce, 0);

console.log("total reduce:", total);

/* FORMA 2: todo junto */
// const total = numberArray.reduce(
//   (accumulator: number, currentValue: number) => accumulator + currentValue,
//   0
// );

/* TRABAJARLO MEDIANTE OBSERVABLES */
interval(500)
  .pipe(
    /* el take(veces) va a completar el observable después de la cantidad de veces que se le indique */
    take(6),
    tap((response) => console.log("tap:", response)),
    reduce(totalReduce, 0)
  )
  .subscribe({
    next: (response) => console.log("next:", response), // la respuesta será 15 porque el interval empieza en 0 luego 1 luego 2, 3, 4, 5 y se termina porque pusimos para solo 6 emisiones take(6), tomando desde el cero del interval, y como el reduce empieza en 0 entonces sería 0 + 1 + 2 + 3 + 4 + 5 = 15 igual que el primer reduce de JavaScript
    complete: () => console.log("complete"),
  });
