import { filter, from, reduce } from "rxjs";

/**
 * Ejercicio:
 ** Sume todos los números del arreglo usando un reduce.
 ** Debe de filtrar para que sólo números sean procesados
 ** La salida debe de ser 32
 *
 * Tip:
 ** isNan() es una función de JavaScript para determinar si es número
 ** Usar filter<any>(...) para no tener problemas de tipado.
 */

(() => {
  const datos = [1, 2, "foo", 3, 5, 6, "bar", 7, 8];

  const reduceFunction = (accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
  };

  from(datos)
    .pipe(
      // filter<any>((value) => !isNaN(value)), // Forma 1 usando isNaN
      filter<any>((value) => typeof value === "number"), // Forma 2 usando typeof
      // filter((value): value is number => !!Number(value)), // Forma 3 usando is number y Number()
      reduce(reduceFunction, 0)
    )
    .subscribe((response) => console.log("response:", response)); // La salida debe de ser 32
})();
