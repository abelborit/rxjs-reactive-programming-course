/* el scan() es exactamente lo mismo que el operador reduce() solo que mientras se van emitiendo los valores del observable entonces regresa su valor acumulado y cuando el observable se completa ya no emitiría valores ya que ya está haciendo cada vez que se emite un valor */
/* El scan() es igual al reduce() pero la diferencia es que si usas reduce, vas a ver el objeto final al completar todas las iteraciones (ves solo el resultado final), mientras que con scan en cada iteracion vas viendo como el objeto se va completando */
import { Observable, from } from "rxjs";
import { map, reduce, scan, tap } from "rxjs/operators";

const numberArray = [1, 2, 3, 4, 5];
const totalReduce = (accumulator: number, currentValue: number) => {
  return accumulator + currentValue;
};

/* REDUCE */
from(numberArray)
  .pipe(
    tap((response) => console.log("reduce:", response)),
    reduce(totalReduce, 0)
  )
  .subscribe({ next: (response) => console.log("next:", response) });

/* SCAN */
from(numberArray)
  .pipe(
    tap((response) => console.log("scan:", response)),
    scan(totalReduce, 0)
  )
  .subscribe({ next: (response) => console.log("next:", response) });

/* ************************************************************************************************************************ */
/* El scan() podría ser base del patrón Redux */
interface User {
  id?: string;
  authenticated?: boolean;
  token?: string | null;
  age?: number;
}

const user: User[] = [
  { id: "fher", authenticated: false, token: null }, // no está autenticado
  { id: "fher", authenticated: true, token: "ABC" }, // ya está autenticado
  { id: "fher", authenticated: true, token: "ABC123" }, // hizo una petición X y le regresó un nuevo token para seguir autenticado
];

/* FORMA 1: colocando el tipo a state$ */
const state$: Observable<User> = from(user).pipe(
  scan(
    (accumulator, currentValue) => {
      return { ...accumulator, ...currentValue };
    },
    { age: 33 }
  )
);

/* FORMA 2: colocando el tipo al operador scan */
// const state$ = from(user).pipe(
//   scan<User, User>(
//     (accumulator, currentValue) => {
//       return { ...accumulator, ...currentValue };
//     },
//     { age: 33 }
//   )
// );

const id$ = state$.pipe(map((state) => state.id));

/* FORMA 1: pasándole por referencia */
// id$.subscribe(console.log);

/* FORMA 2: pasando la función completa */
id$.subscribe((response) => console.log(response));
