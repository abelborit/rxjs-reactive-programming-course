import { Subject, Subscription, interval } from "rxjs";
import { take, map } from "rxjs/operators";

/**
 * Ejercicio:
 ** Realizar que los dos observables finales emitan exactamente el mismo valor
 *
 * Tip:
 ** Hot Observable? subjects?
 */

(() => {
  // == NO TOCAR este bloque ====================
  const reloj$ = interval(1000).pipe(
    take(5),
    map(() => Math.round(Math.random() * 100))
  );
  // No tocar la creación del observable
  // ============================================

  // Estos dos observables deben de emitir exactamente los mismos valores
  // reloj$.subscribe((value) => console.log("obs1", value));
  // reloj$.subscribe((value) => console.log("obs2", value));

  /* crear el subject que es un tipo especial de observable que funciona también como un observer */
  const subject$ = new Subject<number>();
  /* enlazar el observable reloj$ al subject$ y eso nos sirve ya que en lugar de estar suscritos al reloj$ estaremos suscritor al subject$ para distribuir la misma información */
  const relojSubscription$: Subscription = reloj$.subscribe(subject$);

  /* veremos que se crean suscripciones diferentes teniendo el mismo subject pero el subject puede distribuir la misma información a todos los lugares que estén suscritos a este subject lo que da como resultado que los números random entre subscriptionSubject1 y subscriptionSubject2 sean iguales */
  /* se podría colocar de forma directa también sin constantes, es decir, sin colocar subscriptionSubject1 ni subscriptionSubject2 */
  const subscriptionSubject1 = subject$.subscribe({
    next: (value) => console.log("next 1:", value),
    complete: () => console.info("complete subscriptionSubject1"),
  });

  const subscriptionSubject2 = subject$.subscribe({
    next: (value) => console.log("next 2:", value),
    complete: () => console.info("complete subscriptionSubject2"),
  });

  console.log({ subscriptionSubject1, subscriptionSubject2 });

  setTimeout(() => {
    subject$.complete();

    relojSubscription$.unsubscribe();
    console.log("Completado setTimeout - subscriptionSubject1");
    console.log("Completado setTimeout - subscriptionSubject2");
  }, 6000);
})();

/* ************************************************************************************************************************ */
/* 
  - Primero, se limita el flujo de datos a solo 5 elementos emitidos por el intervalo utilizando take(5). Luego, se aplica la función map para transformar cada uno de estos 5 valores en un número aleatorio entre 0 y 100, redondeado al entero más cercano. Esto significa que solo recibirás 5 números aleatorios en total, ya que el flujo se completará después de eso.
  
  const reloj$ = interval(1000).pipe(
    take(5),
    map((value) => Math.round(Math.random() * 100))
  );


  - Primero, se aplica la función map para transformar cada valor emitido por el intervalo en un número aleatorio entre 0 y 100, redondeado al entero más cercano. Luego, el operador take(5) limita el flujo de datos a solo 5 elementos emitidos por el intervalo. Esto significa que obtendrás un flujo de 5 números aleatorios generados cada segundo, y después de recibir 5 de ellos, el flujo se completará.

  const reloj$ = interval(1000).pipe(
    map((value) => Math.round(Math.random() * 100)),
    take(5)
  );


  Entonces, la diferencia radica en cuándo se aplica el take para limitar el número total de elementos emitidos en el flujo. En el primer caso, los números aleatorios se generan primero y luego se limita la cantidad, mientras que en el segundo caso, se limita la cantidad primero y luego se generan los números aleatorios.
*/
