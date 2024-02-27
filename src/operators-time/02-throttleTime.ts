/* el throttleTime() es un operador similar al debounceTime() pero funciona un poquito diferente, es decir, trabaja en base a intervalos de tiempo. Nos ayuda a que cuando se realiza la emisión de un valor y después de un tiempo determinado recién se pueda emitar otro valor. Por ejemplo si emitimos un valor A y se tiene un throttleTime(1000) entonces se muestra A y si no hay nada durante ese 1000ms entonces ya se puede emitir otro valor, pero si tenemos A y luego B y después C de forma consecutiva entonces no se emitirán B ni C ya que no pasó 1000ms todavía pero si luego de 1000ms se emite D entonces nuevamente se puede recibir D y así sucesivamente */
import { fromEvent, asyncScheduler } from "rxjs";
import { throttleTime, distinctUntilChanged, map } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$.pipe(throttleTime(3000)).subscribe((response) => console.log(response));

/* Ejemplo 2 */
const input = document.createElement("input");
document.getElementById("app")?.append(input);

const input$ = fromEvent<KeyboardEvent>(input, "keyup");

input$
  .pipe(
    /* se coloca el asyncScheduler y opciones del throttleTime para que reciba el primer elemento "leading: true," y el último elemento "trailing: true," */
    throttleTime(400, asyncScheduler, {
      leading: false, // true es por defecto pero en este caso no queremos el primer valor
      trailing: true,
    }),
    map((event) => {
      const eventTarget = event.target as HTMLInputElement;
      return eventTarget.value;
    }),
    distinctUntilChanged()
  )
  .subscribe((response) => console.log(response));
