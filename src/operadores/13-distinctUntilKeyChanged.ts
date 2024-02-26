/* el operador distinctUntilKeyChanged() funciona similar a distinct() y distinctUntilChanged() pero este distinctUntilKeyChanged() estará pendiente de los valores que emite el observable según la llave que tenga el distinctUntilKeyChanged(key) */
import { from } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";

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
  .pipe(distinctUntilKeyChanged("nombre"))
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
    /* se podría trabajar haciendo un doble filtro */
    distinctUntilKeyChanged("id"),
    distinctUntilKeyChanged("nombre")
  )
  .subscribe((response) => console.log(response));
