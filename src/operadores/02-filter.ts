import { range, from, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";

range(1, 10)
  .pipe(filter((value) => value % 2 === 1))
  .subscribe((response) => console.log(response)); // pasar toda la función con argumento
// .subscribe(console.log); // pasarlo por referencia

/* aquí es desde el 20 y tiene un rango de 30 elementos más */
range(20, 30)
  .pipe(
    filter((value, index) => {
      console.log("index", index);
      return value % 2 === 1;
    })
  )
  .subscribe((response) => console.log({ response }));

interface Personaje {
  tipo: string;
  nombre: string;
}

const personajes: Personaje[] = [
  {
    tipo: "heroe",
    nombre: "Batman",
  },
  {
    tipo: "heroe",
    nombre: "Robin",
  },
  {
    tipo: "villano",
    nombre: "Joker",
  },
];

/* se usa el from() para poder pasar el arreglo a que sea un observable para poder usar pipe() y subscribe(). Se puede usar from(personajes) o sino un of(...personajes) */
from(personajes)
  /* aquí dejará pasar a todos los personajes que sean diferentes de heroe */
  .pipe(filter((personaje) => personaje.tipo !== "heroe"))
  .subscribe((response) => console.log(response));

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  map((event) => event.code), // recibe un keyboardEvent y retorna un string
  filter((key) => key === "Enter")
);

keyup$.subscribe((response) => console.log(response));
