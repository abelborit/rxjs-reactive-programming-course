/* Realizar importaciones de RxJS: https://rxjs.dev/guide/importing */
import { Observable /* , Observer */ } from "rxjs";

/* un estandar es colocar el nombre que se le dará al observable con el símbolo de $ para indicar que es un observable */
const observable$ = new Observable<string>((subscriber) => {
  console.log({ subscriber });

  subscriber.next("Hola");
  subscriber.next("Mundo");

  subscriber.next("Hola 2");
  subscriber.next("Mundo 2");

  /* forzar un error: aquí nos dará un error ya que se le está asignando una propiedad nombre a algo que es undefined. Esto solo es para ver el error del observable en la consola que en este caso será un error de JavaScript y al momento que haya un error entonces el observable termina, es decir, se completa pero con error y ya no sigue emitiendo nada más, eso también se puede manejar para que así haya error entonces siga trabajando el observable usando un catchError() */
  // const a = undefined;
  // a.nombre = "Nombre";
  // subscriber.next("Hola 3");
  // subscriber.next("Mundo 3");

  subscriber.complete();

  /* estos ya no se emitirán porque ya se completó el observable */
  subscriber.next("Hola 4");
  subscriber.next("Mundo 4");
});

/* FORMA 1: aquí solo procesa el .next() del subscriber que está arriba */
// observable$.subscribe((response) => {
//   console.log(response);
// });

/* FORMA 2: utilizando funciones directamente para el next, error y complete */
// observable$.subscribe(
//   (value) => console.log("next:", value),
//   (error) => console.warn("error:", error),
//   () => console.info("complete")
// );

/* FORMA 3: creando un observer aparte colocando el next, error y complete */
// const observer: Observer<any> = {
//   next: (value) => console.log("[next]", value),
//   error: (error) => console.warn("[error]", error),
//   complete: () => console.info("[complete]"),
// };
// observable$.subscribe(observer);

/* FORMA 4 NUEVA SINTAXIS: hacer todo de forma directa en el subscribe colocando el next, error y complete */
/* Cuando un Observable emite una notificación error o complete a sus observadores, esto finaliza la suscripción. Los observadores no necesitan emitir una notificación de cancelación de suscripción para finalizar las suscripciones que el Observable finaliza de esta manera. */
observable$.subscribe({
  next: (value) => console.log("[(next)]", value),
  error: (error) => console.warn("[(error)]", error),
  complete: () => console.info("[(complete)]"),
});
