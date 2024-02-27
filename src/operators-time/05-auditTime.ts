/* el operador auditTime() emite el último valor que ha sido emitido por el observable en un periodo de tiempo determinado. Por ejemplo, si mi observable emite A y se tiene un auditTime(2000) entonces en un periodo de 2seg espera si hay nuevas emisiones y si hay entonces tomará el valor de la última emisión */
import { fromEvent } from "rxjs";
import { auditTime, tap, map } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$
  .pipe(
    /* igual que el sampleTime() sería un poco más eficiente colocarlo primero porque va a tomar el último valor según su tiempo que en este caso es de 2000ms y recién se procesará la información en el map() en base al último valor emitido */
    auditTime(2000), // emite el última valor que fue emitido por el observable
    map(({ x }) => x),
    tap((value) => console.log("tap", value))
    // auditTime(2000), // emite el última valor que fue emitido por el observable
  )
  .subscribe((response) => console.log("response", response));

/* ************************************************************************************************************************ */
/* ¿Cuál es la diferencia de auditTime con sampleTime? */
/* 
  - El auditTime emite valores basado en el intervalo de tiempo que estableces... es decir, emite algo y luego espera "X" cantidad de segundos a ver si hay una nueva emisión y lo emite.

  - El SampleTime, emite el último valor pero es como un cronómetro, siempre está pendiente de la cantidad de segundos que especificas y emite el último valor dentro de ese lapso de tiempo.
*/
