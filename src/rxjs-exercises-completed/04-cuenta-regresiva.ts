import { Subscription, interval, map, take, takeWhile } from "rxjs";

/**
 * Ejercicio: Realizar una cuenta regresiva empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

(() => {
  const inicio = 7;

  /* FORMA 1: colocando cuántas emisiones queremos que tenga */
  const countdown$ = interval(700).pipe(
    take(inicio + 1),
    map((number) => inicio - number)
  );

  /* FORMA 2: colocando que paren las emisiones hasta que la última emisión seá mayor o igual a cero */
  // const countdown$ = interval(700).pipe(
  //   map((number) => inicio - number),
  //   takeWhile((newNumber) => newNumber >= 0)
  // );

  /* para saber si el observable sigue ejecutándose se puede guardar una referencia a la suscripción (colocándolo en una constante) y luego se puede verificar si la suscripción sigue activa o no. Para eso se puede usar la propiedad .closed la cual es una propiedad que está presente en el tipo Subscription, que representa la conexión entre un observable y un observador, es decir, hay que guardar la referencia a la suscripción en una constante (también se puede colocar directamente después del subscribe().closed ) */
  const subscription$: Subscription = countdown$.subscribe(console.log);

  /* Verificar si la suscripción está activa */
  const isSubscribed = subscription$.closed; // se puede colocar !subscription$.closed para tener un true y en vez de "cerrado" diría "activo"
  console.log("¿La suscripción está cerrada?:", isSubscribed);

  /* luego de un tiempo, nos vamos a desuscribir */
  setTimeout(() => {
    subscription$.unsubscribe();
    console.log("Suscripción cerrada manualmente");
  }, inicio * 1000);

  /* Verificar si la suscripción está cerrada */
  setTimeout(() => {
    console.log("¿La suscripción está cerrada?", subscription$.closed);
  }, inicio * 1000 + 700);
})();
