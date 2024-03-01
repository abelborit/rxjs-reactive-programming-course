/* la función startWith() y endWith() se utiliza para emitir un valor inicial o final como string, number, otro observable (si es otro observable hay que pasarlo por un operador de aplanamiento para poder suscribirnos al mismo observable de forma interna), etc., antes o después de que el observable emita sus valores normales. Si el observable subyacente es síncrono, el valor proporcionado por startWith o endWith también se emitirá de manera síncrona antes o después de las emisiones normales del observable. */
import { of } from "rxjs";
import { startWith, endWith } from "rxjs/operators";

/* FORMA 1: si se coloca la creación del observable y sus operadores pipe entonces todas las suscripciones a este observable tendrán los mismos operadores pipe */
const numeros$ = of(1, 2, 3).pipe(
  startWith("a", "b", "c"),
  endWith("x", "y", "z")
);
numeros$.subscribe(console.log);
// numeros$.subscribe((response) => console.log("response", response));

/* FORMA 2: si se coloca solo la creación del observable entonces las suscripciones tendrán sus propios operadores pipe */
// const numeros2$ = of(1, 2, 3);
// numeros2$
//   .pipe(startWith("a", "b", "c"), endWith("x", "y", "z"))
//   .subscribe(console.log);

// numeros2$
//   .pipe(startWith("d", "e", "f"), endWith("x", "y", "z"))
//   .subscribe(console.log);
