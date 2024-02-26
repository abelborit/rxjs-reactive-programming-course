/* el takeWhile() permite recibir valores mientras la condición se cumpla, por ejemplo takeWhile(x => x < 5), entonces se van emitiendo valores y en la salida solo se mostrarán los que cumplan con la condición, en algunos casos se necesitará el último valor que haya finalizado con la condición, y para eso se coloca un segundo argumento de "inclusive" que es un valor boolean takeWhile(x => x < 5, true/false) si es false entonces no recibirá el último valor que hizo que se rompa la condición y si es true entonces sí lo incluye */
import { fromEvent } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$
  .pipe(
    map(({ x, y }) => ({ x, y })),
    // takeWhile(({ y }) => y <= 150) // NO incluye el último valor que rompe la condición
    takeWhile(({ y }) => y <= 150, true) // SI incluye el último valor que rompe la condición
  )
  .subscribe({
    next: (value) => console.log("next:", value),
    complete: () => console.log("complete"),
  });
