/* el operador distinctUntilChanged() funciona similar a distinct() pero este distinctUntilChanged() emite valores siempre y cuando la emisión anterior inmediata no sea la misma */
import { of, from } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

const numeros$ = of(1, "1", 1, 3, 3, 2, 2, 4, 4, 3, "3", 5, 1, 6, "1");
numeros$
  .pipe(
    /* el distinctUntilChanged() utiliza el === internamente para comprar los valores tanto su valor como tal y su tipo */
    distinctUntilChanged()
  )
  .subscribe((response) => console.log(response));

/* **************************************************************************************************** */
console.log("**************************************************");
/* **************************************************************************************************** */

interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Megaman" },
  { nombre: "Megaman" },
  { nombre: "X" },
  { nombre: "Zero" },
  { nombre: "Dr. Willy" },
  { nombre: "X" },
  { nombre: "Megaman" },
  { nombre: "Zero" },
  { nombre: "Zero" },
];

from(personajes)
  .pipe(
    /* al usar distinctUntilChanged() en objetos se le tiene que dar más información al distinctUntilChanged() para que pueda comprar de alguna forma los objetos ya que si se coloca directamente distinctUntilChanged() en objetos entonces todos serán diferentes aunque tengan los mismos valores ya que cada objeto tiene una referencia en memoria diferente, entonces aquí se le tiene que pasar un valor previo y el valor actual y poder comparar alguna propiedad para que me retorne un boolean (true o false). Si es true entonces no pasa y si es false entonces sí pasa */
    distinctUntilChanged(
      (prevValue, currentValue) => prevValue.nombre === currentValue.nombre
    )
  )
  .subscribe((response) => console.log(response));

/* **************************************************************************************************** */
console.log("**************************************************");
/* **************************************************************************************************** */

interface Personaje2 {
  nombre: string;
  id: string;
}

/* aquí hay un arreglo con objetos con dos propiedades las cuales algunas se repiten como el nombre y el id */
const personajes2: Personaje2[] = [
  { nombre: "Megaman", id: "1" },
  { nombre: "Megaman", id: "2" },
  { nombre: "Megaman", id: "2" },
  { nombre: "Megaman", id: "1" },
  { nombre: "X", id: "1" },
  { nombre: "X", id: "1" },
  { nombre: "Zero", id: "1" },
  { nombre: "Zero", id: "2" },
  { nombre: "Dr. Willy", id: "1" },
  { nombre: "Dr. Willy", id: "1" },
  { nombre: "Dr. Willy", id: "2" },
];

from(personajes2)
  .pipe(
    /* como personajes2 tiene más de una propiedad y se quiere que se muestre solo cuando todas las propiedades sean diferentes, entonces se pasará por un JSON.stringify() para que sean comparados como cadenas de texto en lugar de comparar las referencias de los objetos. Por lo tanto, al utilizar JSON.stringify(), se está convirtiendo cada objeto en una cadena de texto que representa su estructura. Esto garantiza que objetos con las mismas propiedades tengan la misma representación de cadena de texto y, por lo tanto, puedan ser correctamente comparados por distinctUntilChanged(), permitiendo filtrar adecuadamente los elementos duplicados según su estructura */
    distinctUntilChanged(
      (prevValue, currentValue) =>
        JSON.stringify(prevValue) === JSON.stringify(currentValue)
    )
  )
  .subscribe((response) => console.log(response));
