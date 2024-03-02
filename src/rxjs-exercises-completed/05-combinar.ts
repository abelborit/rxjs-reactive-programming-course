import { combineLatest, interval, timer } from "rxjs";
import { map, take } from "rxjs/operators";
/**
 * Ejercicio: Combinar ambos observables (letras$, numeros$)
 * para que las emisiones sean la concatenación de los últimos
 * valores emitidos
 */

//  Ejemplo de lo que se espera:
// a1
// a2
// b2
// b3
// c3
// c4
// d4
// d5
// e5

(() => {
  const letras = ["a", "b", "c", "d", "e"];
  const numeros = [1, 2, 3, 4, 5];

  // Emite letras cada segundo
  const letras$ = interval(1000).pipe(
    map((interval) => letras[interval]),
    take(letras.length)
  );

  // Emite numeros del 1 al 5 cada segundo, pero tiene un delay inicial
  // de 500 milésimas
  const numeros$ = timer(500, 1000).pipe(
    map((interval) => numeros[interval]),
    take(numeros.length)
  );

  /* 
    1. colocar las últimas emisiones de los observables en un arreglo con combineLatest([.....])
    2. usar el pipe map() para transformar la data y poder concatenar ambas respuestas
  */

  /* FORMA 1: colocando todo el response y luego hacer uso de sus posiciones */
  combineLatest([letras$, numeros$])
    .pipe(map((response) => response[0] + response[1]))
    .subscribe((response) => console.log("response:", response));

  /* FORMA 2: haciendo la desestructuración de un array para colocarlo directo */
  // combineLatest([letras$, numeros$])
  //   .pipe(map(([letra, numero]) => letra + numero))
  //   .subscribe((response) => console.log("response:", response));

  /* FORMA 3: como response es un array y los quiero concatenados entonces se puede usar el .join("") para que se unan los elementos del array */
  // combineLatest([letras$, numeros$])
  //   .pipe(map((response) => response.join("")))
  //   .subscribe((response) => console.log("response:", response));
})();
