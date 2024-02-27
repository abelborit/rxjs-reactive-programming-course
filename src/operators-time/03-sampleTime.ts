/* el operador sampleTime(time) nos permite obtener el último valor emitido en un rango de tiempo. En el momento en que se realice una suscripción el sampleTime(time) va a estar emitiendo el último valor en el rango que se le dió en el time pero si no se emitió un valor en ese time entonces no emite nada. Por ejemplo, si se tiene un sampleTime(1000) y se realiza una suscripción que emiten valores A, B, C todo dentro de esos 1000ms = 1seg entonces va a recibir el valor C, luego si después de esos 1000ms = 1seg se emite un valor F entonces se recibe ese valor F, luego de esos 1000ms = 1seg se emiten valores de G, H, J entonces se recibirá J ya que es el último valor que se emitió durante esos 1000ms = 1seg */
import { fromEvent } from "rxjs";
import { map, sampleTime } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$
  .pipe(
    sampleTime(2000), // es un poco más eficiente colocar el sampleTime() primero porque va a tomar el último valor según su tiempo que en este caso es de 2000ms y recién se procesará la información en el map() en base al último valor emitido
    map(({ x, y }) => ({ x, y })) // se desestructura ({x, y}) y luego se retorna un objeto de ({x, y})
    // sampleTime(2000), // aquí se pierde un poco el rendimiento porque en el map() ya hicimos todo el procesamiento de varios valores emitidos aunque aún no se muestra la información por el sampleTime()
  )
  .subscribe((response) => console.log(response));

/* ************************************************************************************************************************ */
/* ¿Existe alguna jerarquía que se deba de seguir para siempre sacar el mejor provecho en cuanto a rendimiento con respecto al tipo de operador que se utiliza en el encadenamiento? */
/* La idea sería utilizar primero los operadores que filtren y luego los que procesan o transforman pero todo puede depender de la necesidad del proyecto y de la información que fluye */
