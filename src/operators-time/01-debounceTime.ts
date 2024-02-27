/* el debounceTime() trabaja en base a intervalos de tiempo. Nos ayuda a que podamos contar cuántas milésimas de segundo han pasado desde la última emisión y si esas milésimas de segundo sobre pasan el parámetro que tenemos dentro de los () entonces emitirá dicho valor. Nos ayudará a poder restringir la cantidad de emisiones en nuestro observable inicial está emitiendo */
/* El debounceTime es un operador de limitación de velocidad, ya que retrasa los valores emitidos y elimina en casos de multiples emisiones todas las anteriores solo dejando la ultima. */
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$.pipe(debounceTime(1500)).subscribe((response) => console.log(response));

/* Ejemplo 2 */
const input = document.createElement("input");
document.getElementById("app")?.append(input);

const input$ = fromEvent<KeyboardEvent>(input, "keyup");

input$
  .pipe(
    debounceTime(1000),
    /* se coloca el event.target as HTMLInputElement para que sepa a qué elemento html hacemos referencia que en este caso es un input y luego retornamos su value */
    map((event) => {
      const eventTarget = event.target as HTMLInputElement;
      return eventTarget.value;
    }),
    distinctUntilChanged() // para que emita valores siempre y cuando la emisión anterior inmediata no sea la misma
  )
  .subscribe((response) => console.log(response));
