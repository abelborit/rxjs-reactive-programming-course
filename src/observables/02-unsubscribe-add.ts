import { Observable } from "rxjs";

const interval$ = new Observable<number>((subscriber) => {
  let count = 0;

  /* si no limpiamos el setInterval al terminar la suscripción entonces veremos que el observable sí terminó su emición pero el setInterval sigue emitiendo lo que tenga en su interior ya que */
  const interval = setInterval(() => {
    count = count + 1;
    subscriber.next(count);
    console.log("setInterval - count:", count);
  }, 1000);

  setTimeout(() => {
    subscriber.complete();
  }, 2500);

  /* el observable tiene un return que sería como una función de limpieza, es decir, es el código que quiero que se ejecute cuando se dispara el unsubscribe() */
  /* El return dentro del observable lo que hace es tener esa función o código de retorno y se ejecutará cuando el observable vaya a ser destruido, es un paso que se utiliza para realizar limpieza pero puede que nunca se llame si nunca se termina el observable */
  return () => {
    clearInterval(interval);
    console.log("setInterval destroyed");
  };
});

/* como el .subscribe() es de tipo Subscription entonces se puede almacenar todo en un variable para poder hacer poder hacer el unsubscribe() */
/* aquí hay varias suscripciones a un mismo observable ya que cada suscripción es de forma independiente a la otra ya que crea una nueva instancia del observable */
const subscription1 = interval$.subscribe({
  next: (value) => console.log("next 1:", value),
  error: (error) => console.warn("error 1:", error),
  complete: () => console.info("complete subscription1"),
});

const subscription2 = interval$.subscribe({
  next: (value) => console.log("next 2:", value),
  error: (error) => console.warn("error 2:", error),
  complete: () => console.info("complete subscription2"),
});

const subscription3 = interval$.subscribe({
  next: (value) => console.log("next 3:", value),
  error: (error) => console.warn("error 3:", error),
  complete: () => console.info("complete subscription3"),
});

const subscription4 = interval$.subscribe({
  next: (value) => console.log("next 4:", value),
  error: (error) => console.warn("error 4:", error),
  complete: () => console.info("complete subscription4"),
});

/* para evitar hacer el unsubscribe por cada subscription1 entonces se pueden anidar o encadenar subscriptions con el .add() entonces cuando se llame al subscription2 llamará a la función que va a limpiar la función retorno de mi observable */
/* hacerlo de esta forma hará que se realicen en cadena uno detrás del otro */
subscription2.add(subscription3.add(subscription4));

/* hacerlo de esta forma hará que se realicen al mismo tiempo el unsubscribe() del subscription3 y subscription4 */
// subscription2.add(subscription3);
// subscription2.add(subscription4);

setTimeout(() => {
  /* hay que tener en cuenta que el unsubscribe() no es lo mismo que el complete del subscriber. Entonces por ejemplo, si vemos que el complete se realiza antes del unsubscribe() entonces cuando se haga el complete se ejecutará el return del observable y no importa cuantas veces llamemos al unsubscribe() porque ya no se ejecutará porque ya se hizo el complete del subscriber y por ende la limpieza del observable */
  subscription1.unsubscribe();
  subscription1.unsubscribe();
  subscription1.unsubscribe();
  console.log("Completado setTimeout - subscription1");
}, 5000);

setTimeout(() => {
  // subscription2.unsubscribe();
  // subscription3.unsubscribe();
  // subscription4.unsubscribe();
  // console.log("Completado setTimeout - subscription2");
  // console.log("Completado setTimeout - subscription3");
  // console.log("Completado setTimeout - subscription4");

  /* terminar observables en cadena pero veremos que aquí sí se mandará a llamar el complete del subscription2 y del subscription3 pero no del subscription4 ya que se está realizando el unsubscribe() en cadena */
  subscription2.unsubscribe();
  console.log("Completado setTimeout - subscription2");
  console.log("Completado setTimeout - subscription3");
  console.log("Completado setTimeout - subscription4");
}, 7000);

/* ******************************************************************************************************************* */
/* ¿Por qué sigue emitiendo valores si ya no tiene subscripciones? */
/* 
Aquí realmente NO está emitiendo valores el observable ya que hemos hecho el unsubscribe de todas las subscripciones. Aquí el detalle a tener en cuenta es que si dentro de nuestro observable, usamos un setInterval por ejemplo, este no se va a destruir automáticamente si hacemos el unsubscribe, va a seguir ahí en memoria, tenemos que borrarlo manualmente.

Vemos en consola que se siguen "emitiendo" valores, pero en ese momento no es por el propio observable, sino por el interval, ya que lo que tengas ahí dentro se va a seguir ejecutando. El subscriber.next(count) nos será indiferente ya que no tenemos ninguna subscripción activa, y no lo vemos reflejado en la consola, aunque internamente se siga ejecutando.

A la que añadimos algo visual, como el console.log, es cuando nos damos cuenta que se sigue ejecutando el interval, y hay que limpiarlo para que justo esto no pase. De ahí que almacenemos el interval en una variable para luego en el return del observable poder hacer un clearInterval, y ahí sí asegurarnos que no quedó código ejecutándose que puede llevar a un desbordamiento de memoria. Pasaría lo mismo si dentro del observable creáramos un event listener por ejemplo, que aunque hagamos el unsubscribe, el listener seguirá en memoria si no lo limpiamos manualmente.
*/

/* ******************************************************************************************************************* */
/* complete del subscriber vs unsubscribe() */
/* 
  - unsubscribe() -> se refiere a la acción de cancelar una suscripción a un observable. Se puede llamar al método unsubscribe() en el objeto de suscripción para dejar de recibir eventos del observable al que te suscribiste. Este método se utiliza para cancelar una suscripción a un observable. Cuando te suscribes a un observable para recibir eventos, RxJS devuelve un objeto de suscripción. Llamar a unsubscribe() en este objeto cancelará la suscripción, lo que significa que ya no recibirás más eventos del observable. Esto es útil para liberar recursos y evitar fugas de memoria cuando ya no necesitas escuchar eventos del observable.

  - complete del subscriber -> se refiere a la emisión de un evento de "completado" por parte de un observable. Este evento indica que el observable ha terminado de emitir valores y no emitirá más eventos en el futuro. Cuando un observable completa su secuencia de eventos, se puede considerar que ha alcanzado su "finalización" y ya no emitirá más valores. Esto es útil para indicar a los suscriptores que no habrá más datos disponibles y que pueden realizar las acciones de limpieza necesarias.
*/
