/* el forkJoin() así como el combineLatest() o merge(), este también puede recibir varios observables como argumentos pero en un arreglo y los observables tienen que ser finitos para emitir los valores y cuando todos los observables se completan entonces el forkJoin() recién va a emitir los últimos valores emitidos por los observables en la respuesta de la suscripción en forma de arreglo pero con una pequeña configuración lo podemos transformar en un objeto */
import { of, interval, forkJoin } from "rxjs";
import { take, delay } from "rxjs/operators";

const numeros$ = of(1, 2, 3, 4);
const intervalo$ = interval(1000).pipe(take(3)); // 0..1..2
const letras$ = of("a", "b", "c").pipe(delay(1000));

forkJoin([numeros$, intervalo$, letras$]).subscribe(console.log);

/* no usando la desestructuración y usando solo las posiciones: response[0] - response[1] - response[2]  */
// forkJoin([numeros$, intervalo$, letras$]).subscribe((response) => {
//   console.log(response);
//   console.log("numeros: ", response[0]);
//   console.log("intervalo: ", response[1]);
//   console.log("letras: ", response[2]);
// });

/* haciendo la desestructuración de un array */
// forkJoin([numeros$, intervalo$, letras$]).subscribe(
//   ([numeros, intervalo, letras]) => {
//     console.log("numeros", numeros);
//     console.log("intervalo", intervalo);
//     console.log("letras", letras);
//   }
// );

/* pasando los observables como un objeto con sus mismos nombres porque colocar numeros$: numeros$ es igual a colocar solo numeros$ */
// forkJoin({
//   numeros$,
//   intervalo$,
//   letras$,
// }).subscribe((response) => {
//   console.log(response);
//   console.log("numeros: ", response.numeros$);
//   console.log("intervalo: ", response.intervalo$);
//   console.log("letras: ", response.letras$);
// });

/* pasando los observables como un objeto con sus otros nombres */
// forkJoin({
//   numerosObservable: numeros$,
//   intervaloObservable: intervalo$,
//   letrasObservable: letras$,
// }).subscribe((response) => {
//   console.log(response);
//   console.log("numerosObservable: ", response.numerosObservable);
//   console.log("intervaloObservable: ", response.intervaloObservable);
//   console.log("letrasObservable: ", response.letrasObservable);
// });
