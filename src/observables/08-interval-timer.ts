/* interval() es una función que nos permite crear observables en base a intervalos de tiempo, por ejemplo, interval(1000) es que cada 1seg = 1000ms emita un valor que empieza desde el 0 hasta X valor del infinito y así nos desuscribamos igual seguirá emitiendo valores hasta utilizar algunos operadores especiales para cancelar o para emitir una cantidad de veces determinada. Este interval() es asíncrono por naturaleza. Emite la secuencia de números tan pronto se libera la secuencia de callbacks de javascript, es decir, no es que se ejecute inmediatamente al instanciarlo sino cuando pueda ejecutarlo javascript */

/* timer() es una función que nos permite crear observables en base a intervalos de tiempo, por ejemplo, timer(2000) es que después de 2seg = 2000ms emita el primero valor y se completará el observable y ya no se seguirán emitiendo valores o también se puede colocar un segundo argumento para que siga emitiendo valores después que haya pasado el valor del primero argumento. Este timer() es asíncrono por naturaleza. Emite la secuencia de números tan pronto se libera la secuencia de callbacks de javascript, es decir, no es que se ejecute inmediatamente al instanciarlo sino que cuando pueda ejecutarlo javascript */
import { interval, timer } from "rxjs";

const interval1$ = interval(1000);
const timer1$ = timer(2000); // después de 2seg emitirá un valor 0 y luego completará el observable en ese valor
const timer2$ = timer(2000, 1000); // después de 2seg emitirá un valor 0 y cada 1seg emitirá valores de 1, 2, etc..., es prácticamente como si fuera un interval(1000) pero que empieza después de 2seg tan pronto JavaScript pueda ejecutarlo

/* como son asíncronos por naturaleza entonces primero se ejecutará los console.log() que son parte del hilo principal de JavaScript y luego la funcionalidad del observable ya que estará desenlazado del hilo principal de la aplicación */
console.log("Inicio del proceso 1");
interval1$.subscribe({
  next: (value) => console.log("next 1:", value),
  error: (error) => console.warn("error 1:", error),
  complete: () => console.info("complete source1$: interval()"),
});
console.log("Fin del proceso 1");

/* como son asíncronos por naturaleza entonces primero se ejecutará los console.log() que son parte del hilo principal de JavaScript y luego la funcionalidad del observable ya que estará desenlazado del hilo principal de la aplicación */
console.log("Inicio del proceso 2");
timer1$.subscribe({
  next: (value) => console.log("next 2:", value),
  error: (error) => console.warn("error 2:", error),
  complete: () => console.info("complete source2$: timer()"),
});
console.log("Fin del proceso 2");

/* como son asíncronos por naturaleza entonces primero se ejecutará los console.log() que son parte del hilo principal de JavaScript y luego la funcionalidad del observable ya que estará desenlazado del hilo principal de la aplicación */
console.log("Inicio del proceso 3");
timer2$.subscribe({
  next: (value) => console.log("next 3:", value),
  error: (error) => console.warn("error 3:", error),
  complete: () => console.info("complete source3$: timer()"),
});
console.log("Fin del proceso 3");

/* también se puede trabajar con fechas, por ejemplo, si queremos que se realice una notificación 5 segundos después de la hora actual para mostrar al usuario alguna notificación de alguna compra o X cosa */
const hoyEn5Segundos = new Date(); // fecha actual
hoyEn5Segundos.setSeconds(hoyEn5Segundos.getSeconds() + 5); // fecha actual + 5 segundos

/* pasarle a mi timer() la fecha a la cual quiero que se emita el valor del observable */
const timer3$ = timer(hoyEn5Segundos);
console.log("Inicio del proceso 4");
timer3$.subscribe({
  next: (value) => console.log("next 4:", value),
  error: (error) => console.warn("error 4:", error),
  complete: () => console.info("complete source4$: timer()"),
});
console.log("Fin del proceso 4");
