/* el operador retry(count) devuelve un Observable que se volverá a suscribir a la secuencia fuente cuando la secuencia fuente tenga errores, en la mayoría de los count casos. Si el Observable de origen llama al error, este método se volverá a suscribir al Observable de origen para un máximo de count resuscripciones en lugar de propagar la llamada de error */
/* El operador mergeMap() se utiliza para transformar los valores emitidos por un observable en otros observables, y luego aplanar esos observables internos en uno solo. Esto significa que cada valor emitido por el observable fuente se mapeará a un nuevo observable, y los valores emitidos por estos observables internos se "aplanarán" en un único flujo observable. */
import { interval, mergeMap, throwError, of, retry } from "rxjs";

const source$ = interval(1000);
const result$ = source$.pipe(
  mergeMap((value) => (value > 5 ? throwError(() => "Error!") : of(value))),
  retry(2) // reintentará en 2 oportunidades si hay algún error
);

result$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log(`${err}: Retried 2 times then quit!`),
});

/* lo que nos arrojará será lo siguiente: */
// Output:
// 0..1..2..3..4..5..
// 0..1..2..3..4..5..
// 0..1..2..3..4..5..
// 'Error!: Retried 2 times then quit!'
