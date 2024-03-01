/* la función concatWith() es una función que emite todos los valores del observable inicial y luego, una vez que se completa, se suscribe a cada observable proporcionado, una a la vez, emite todos sus valores y no se suscribe a la siguiente hasta que se completa y así sucesivamente. Es una función que devuelve un Observable que concatena suscripciones al observable inicial y proporciona Observables que se suscriben al siguiente solo una vez que se completa la suscripción actual */
import { fromEvent, map, take, concatWith } from "rxjs";

const clicks$ = fromEvent(document, "click");
const moves$ = fromEvent(document, "mousemove");

clicks$
  .pipe(
    map(() => "click"), // emisión del observable inicial
    take(1), // se completa la suscripción del observable clicks$
    concatWith(moves$.pipe(map(() => "move"))), // cuando se complete la suscipción del observable anterior recién esta suscripción empezará a emitir valores
    take(100) // se completa la suscripción del observable moves$
  )
  .subscribe({
    next: (response) => console.log(response),
    complete: () => console.log("complete"), // cuando ambos se completen entonces se completa toda la suscripción
  });
