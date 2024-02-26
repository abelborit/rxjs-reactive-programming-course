/* el operador map() es el más común de todos y es el que más se utiliza. Nos permite transformar lo que se recibe del observable y transformarlo a lo que nosotros necesitemos, puede servir para extraer información, transformar la información y retornar algo totalmente distinto si así fuera el caso */
import { fromEvent, range } from "rxjs";
import { map } from "rxjs/operators";

range(1, 5)
  .pipe(
    /* aquí al map se le dice que es de tipo number y retornará algo de tipo number */
    map<number, number>((value) => {
      console.log("value:", value);
      /* cuando se usa el map se tiene que retornar algo */
      return value * 10;
    })
  )
  .subscribe((response) => {
    console.log("response:", response);
  });

range(1, 5)
  .pipe(
    /* aquí al map se le dice que es de tipo number y retornará algo de tipo string */
    map<number, string>((value) => {
      console.log("value:", value);
      /* cuando se usa el map se tiene que retornar algo */
      return (value * 10).toString();
    })
  )
  .subscribe((response) => {
    console.log("response string:", response);
  });

const keyup$ = fromEvent<PointerEvent>(document, "click");

/* FORMA 1: hacerlo por separado pipe y suscribe SEPARADOS */
// const keyupPipe = keyup$.pipe(
//   map((eventResponse) => {
//     // console.log(eventResponse);
//     return { x: eventResponse.x, y: eventResponse.y };
//   })
// );

// /* hay que suscribirnos al pipe creado anteriormente porque sino NO habrá forma de tener lo que queremos */
// keyupPipe.subscribe((response) => {
//   console.log("response map():", response);
// });

/* FORMA 2: hacerlo todo junto pipe y suscribe JUNTOS */
interface eventResponsePipe {
  x: number;
  y: number;
  baseURI: string;
}

keyup$
  .pipe(
    map<PointerEvent, eventResponsePipe>((eventResponse) => {
      console.log("response pipe(map()):", eventResponse);
      /* Con esta conversión, TypeScript debería entender que targetElement es un elemento del DOM y que, por lo tanto, tiene la propiedad baseURI. Hay que asegurarnos de que eventResponse.target sea realmente un elemento del DOM antes de hacer esta conversión, ya que podría causar errores si eventResponse.target no es del tipo esperado. */
      const targetElement = eventResponse.target as Element;

      return {
        x: eventResponse.x,
        y: eventResponse.y,
        baseURI: targetElement.baseURI,
      };
    })
  )
  .subscribe((response) => {
    console.log("response subscribe():", response);
  });

/* aquí se está cambiando el valor de lo que venga en el keyup$ a un valor true por el operador map() */
keyup$
  .pipe(
    map((eventResponse) => {
      console.log(eventResponse);
      return true;
    })
  )
  .subscribe((response) => {
    console.log("response subscribe():", response);
  });
