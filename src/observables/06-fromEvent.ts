/* fromEvent() es una función que nos permite crear observables en base a un event target, por ejemplo, fromEvent<Event>(document, "scroll"), este es una función que creará un observable en base a un event target donde en este caso el event target es el document y solo queremos saber los eventos emitidos del document que tienen que ver con el scroll, esto quiere decir que, mientras hacemos scroll en el document va a emitir dichos eventos y prácticamente no habría un fin pero se puede cancelar, terminarlo, etc para evitar fugas de memoria */
/* el event target es como una interfaz que hace referencia al objeto en el cual se lanza el evento. El "event target" no se trata de una herramienta, o un concepto como tal, sino en este caso, cuál será el objetivo del DOM de donde proviene el evento. Los EventTarget más comunes son Element, document, window. */
import { fromEvent } from "rxjs";

/* Eventos del DOM los cuales podemos verlos en la consola al mandar el evento y hacer un console.log() para ver su información y luego solo la colocamos en el tipado para tener su intellisense y por ende sus propiedades */
const source1$ = fromEvent<PointerEvent>(document, "click");
const source2$ = fromEvent<KeyboardEvent>(document, "keyup");

source1$.subscribe({
  next: (event) => console.log("next 1:", event),
  error: (error) => console.warn("error 1:", error),
  complete: () => console.info("complete observable 1: fromEvent()"),
});

source2$.subscribe({
  next: (event) => console.log("next 2:", event),
  error: (error) => console.warn("error 2:", error),
  complete: () => console.info("complete observable 2: fromEvent()"),
});

/* ************************************************************************************************************************ */
/* fromEvent vs HostListener vs eventListener */
/* 
Si se está usando Angular sin duda la recomendación seria usar HostListener (https://angular.io/api/core/HostListener) que es un decorador diseñado por angular para escuchar los eventos del DOM y disparar cierto bloque de código.

Usando RxJs y su fromEvent (https://rxjs-dev.firebaseapp.com/api/index/function/fromEvent) es muy parecido pero con la diferencia de que crea un observable que emite eventos provenientes del DOM. Combinado con los múltiples operadores de Rxjs puede ser muy poderoso.

Usar el addEventListener (https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener) que registra un evento a un objeto en específico y utiliza callbacks.
*/
