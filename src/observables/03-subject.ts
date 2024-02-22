import { Observable, Subject } from "rxjs";

const interval$ = new Observable<number>((subscriber) => {
  const interval = setInterval(() => {
    /* Cold Observable */
    subscriber.next(Math.random());
  }, 1000);

  return () => {
    clearInterval(interval);
    console.log("setInterval destroyed");
  };
});

/* *** SUSCRIPCIÓN AL OBSERVABLE *** */
/* de esta forma veremos que se crean suscripciones diferentes teniendo el mismo observable lo que da como resultado que los números random entre subscription1 y subscription2 sean totalmente diferentes */
// const subscription1 = interval$.subscribe({
//   next: (value) => console.log("next 1:", value),
//   error: (error) => console.warn("error 1:", error),
//   complete: () => console.info("complete subscription1"),
// });

// const subscription2 = interval$.subscribe({
//   next: (value) => console.log("next 2:", value),
//   error: (error) => console.warn("error 2:", error),
//   complete: () => console.info("complete subscription2"),
// });

/* *** SUSCRIPCIÓN AL SUBJECT *** */
/* el Subject es un tipo especial de observable pero tiene unas caracteristicas importantes: 
  1. Casteo múltiple -> es decir que múltiples suscripciones van a estar sujetas a este mismo subject (que es un observable) y me sirve para distribuir la misma información a todos los lugares que estén suscritos a este subject
  2. También es un observer -> se puede mandar como un observer
  3. Next, error y complete -> tiene los mismos métodos de un observable 
*/
const subject$ = new Subject<number>();
/* como el Subject() es un observer entonces se lo puede mandar dentro del cuerpo del .subscribe() y aquí veremos que el interval$ es un observable que emite algo de tipo number pero que también este interval$ está enlazado a su subject$ que es de tipo number y eso nos sirve ya que en lugar de estar suscritos al interval$ estaremos suscritor al subject$ para distribuir la misma información */
const intervalSubject$ = interval$.subscribe(subject$);

/* de esta forma veremos que se crean suscripciones diferentes teniendo el mismo subject pero el subject puede distribuir la misma información a todos los lugares que estén suscritos a este subject lo que da como resultado que los números random entre subscription1 y subscription2 sean iguales */
const subscriptionSubject1 = subject$.subscribe({
  next: (value) => console.log("next 1:", value),
  error: (error) => console.warn("error 1:", error),
  complete: () => console.info("complete subscriptionSubject1"),
});

const subscriptionSubject2 = subject$.subscribe({
  next: (value) => console.log("next 2:", value),
  error: (error) => console.warn("error 2:", error),
  complete: () => console.info("complete subscriptionSubject2"),
});

setTimeout(() => {
  /* cuando la data es producida por el observable en sí mismo es considerado un "Cold Observable" pero cuando la data es producida FUERA del observable es considerado un "Hot Observable". Entonces el subject nos permite transformar un Cold Observable en un Hot Observable */
  /* Hot Observable */
  /* aquí solo se está llamando al complete del subject pero de esta forma aún no se dispara el return del observable y por ende sigue consumiendo recursos el setInterval ya que nunca se mandó a llamar al clearInterval porque aun tenemos la suscripción del intervalo$ activa */
  subject$.next(10);
  subject$.complete();

  /* para solucionar lo anterior entonces se tiene que mandar el unsubscribe() pero en este caso de la suscripción del observable que utiliza el subject$ para que de esta forma se dispara el return del observable */
  intervalSubject$.unsubscribe();
  console.log("Completado setTimeout - subscriptionSubject1");
  console.log("Completado setTimeout - subscriptionSubject2");
}, 5000);

/* ******************************************************************************************************************* */
/* 
Los Subject son Observables, solo que de un tipo especial igual que BehaviorSubject. Los subject son multidifusión mientras que los observables "normales" son unidifusión. 
*/

/* Diferencias entre Subject y BehaviorSubject */
/* 
Los objetos Subject y BehaviorSubject son dos tipos de sujetos en RxJS que permiten la emisión y subscripción a eventos. Sin embargo, tienen diferencias importantes en su comportamiento:

  - Un Subject es un tipo de observable que permite tanto la emisión de nuevos valores como la subscripción a ellos. No tiene un valor inicial y no recuerda el último valor emitido antes de que un nuevo suscriptor se una. Cuando un nuevo suscriptor se suscribe a un Subject, solo recibirá eventos que se emitan después de que se una, y no recibirá eventos previos. Es útil cuando solo necesitas transmitir eventos futuros y no te importa lo que sucedió antes de que un suscriptor se uniera. Se activa solo en la llamada del .next(value) y devuelve o emite el value.

  - Un BehaviorSubject es similar a un Subject, pero tiene un valor inicial y recuerda el último valor emitido. Cuando se suscribe, emite el valor inmediatamente, es decir, cuando un nuevo suscriptor se une a un BehaviorSubject, recibirá inmediatamente el último valor emitido antes de unirse. Después de que un suscriptor se une, recibirá eventos futuros normalmente como con un Subject. Es útil cuando necesitas que los nuevos suscriptores reciban el último valor emitido, lo que lo hace conveniente para representar valores que cambian con el tiempo, como el estado de una aplicación o un valor en un formulario.

En resumen, la principal diferencia entre un Subject y un BehaviorSubject radica en su capacidad para recordar y transmitir el último valor emitido antes de que un nuevo suscriptor se una. Mientras que un Subject no recuerda ningún valor anterior, un BehaviorSubject recuerda y transmite el último valor emitido.
*/
