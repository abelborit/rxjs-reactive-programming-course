/* el operador takeUntil() recibe como argumento otro observable. Este operador funciona por ejemplo, que el primer observable siga emitiendo hasta que el segundo observable emita su primer valor */
/* el operador skip() me sirve para saltar u omitir X cantidad de emisiones iniciales, es decir, si se tiene skip(3) entonces en su cuarta emisión recién se podrán ver los valores y en las 3 primeras emisiones no ya que skip(3) los omite, esto tanto para observables o para operadores que estén después del skip() */
import { interval, fromEvent } from "rxjs";
import { takeUntil, skip, tap } from "rxjs/operators";

/* crear el botón, asignarle su HTML y luego agregarlo en el DOM */
const buttonCreated = document.createElement("button");
buttonCreated.innerHTML = "Detener Timer";
document.getElementById("app")?.append(buttonCreated);

const counter$ = interval(1000);
// const clickBtn$ = fromEvent( buttonCreated, 'click' );

/* funcionamiento del skip:
  - al hacer el primer click se disparará el primer operador tap() y luego el skip(1) pero como tiene el valor de 1 entonces no emitirá valores siguientes, luego cuando se haga un segundo click entonces volverá a emitir el valor del primer tap() y como ya se hizo el skip(1) porque ya estamos en la emisión 2 entonces ya pasaría al siguiente operador que sería el segundo tap()
*/
const clickBtn$ = fromEvent(buttonCreated, "click").pipe(
  tap(() => console.log("tap antes de skip")),
  skip(1), // para que omita la primera emisión del observable clickBtn$ y eso hará que al hacer un segundo click entonces recién emita valores y con ese valor emitido entonces el observable counter$ se completa
  tap(() => console.log("tap después de skip"))
);

/* el observable counter$ estará emitiendo valores hasta que el clickBtn$ "takeUntil(clickBtn$)" emita su primer valor */
counter$.pipe(takeUntil(clickBtn$)).subscribe({
  next: (value) => console.log("next", value),
  complete: () => console.log("complete"),
});
