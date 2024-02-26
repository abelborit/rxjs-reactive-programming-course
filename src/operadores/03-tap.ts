/* el tap() es un operador muy utilizado y nos ayuda a saber cómo va fluyendo la información a través de nuestros observables. Este tap() nos permite lanzar efectos secundarios pero hay que tener cuidado porque puede ser que se lancen acciones que no queremos. Se usa más para lanzar efectos secundarios como por ejemplo ver en consola la información que va fluyendo, o se necesite lanzar alguna acción cuando la información pasa por el observable */

import { range } from "rxjs";
import { tap, map } from "rxjs/operators";

const numeros$ = range(1, 5);

numeros$
  .pipe(
    tap<number>((value) => {
      console.log("first tap()", value);
      /* el return del tap() no influye en nada ya que aunque se tenga de manera explícita el return no cambia el flujo de información. En el map() el return sí cambia el flujo */
      return 100000;
    }),
    map<number, number>((value) => value * 10),
    tap<number>((value) => {
      console.log("second tap()", value);
    }),
    tap<number>({
      /* aquí se mandará el tap pero como si fuera un observer, es una de las formas con la que se puede trabajar el tap(). Pero el tap sólo debería ser usado para disparar efectos secundarios, no debe de ser usado para completar tareas o terminar observables ya que esto no termina el observable, simplemente nos dice cómo esta la información fluyendo en ese punto */
      next: (value) => console.log("observer tap()", value),
      complete: () => console.log("se terminaron las operaciones"),
    })
  )
  .subscribe((value) => console.log("subscribe", value));
