import { of, from } from "rxjs";

/*
 - of = crea un observable tomando sus argumentos y genera a una secuencia de valores
 - from = crea un observable en base a un array, promise, iterable, observable
*/

const observer = {
  next: (value: any) => console.log("next:", value),
  complete: () => console.log("complete"),
};

const source1$ = from([1, 2, 3, 4, 5]);
const source2$ = from("Fernando");
const source3$ = of([1, 2, 3, 4, 5]);
const source4$ = of(...[1, 2, 3, 4, 5]);
const source5$ = of("Fernando");

source1$.subscribe(observer);
source2$.subscribe(observer);
source3$.subscribe(observer);
source4$.subscribe(observer);
source5$.subscribe(observer);

const source6$ = from(fetch("https://api.github.com/users/klerith"));
source6$.subscribe(observer);
source6$.subscribe(async (response) => {
  // console.log(response);

  const dataResponse = await response.json();
  console.log(dataResponse);
});

/* un iterable es un objeto que me permite obtener los valores de forma secuencial de él mismo. El * me dice que es una función generadora */
const miGenerador = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
};

const miIterable = miGenerador();

/* FORMA 1: usando for tradicional */
// for (let id of miIterable) {
//   console.log(id);
// }

/* FORMA 2: usando el from() y luego suscribirnos */
from(miIterable).subscribe({
  next: (value: any) => console.log("next iterable:", value),
  complete: () => console.log("complete iterable"),
});
