import { ajax } from "rxjs/ajax";
import { switchMap, map, combineLatestWith } from "rxjs/operators";
import { zip, of } from "rxjs";

/**
 * Ejercicio: https://swapi.dev/
 *  Realizar 2 peticiones HTTP (ajax) una después de otra.
 *
 *  La primera debe de obtener el personaje de Star Wars:
 *   Luke Skywalker, llamando el endpoint:   /people/1/
 *
 *  La segunda petición, debe de ser utilizando el objeto
 *  de la petición anterior, y tomar la especie (species),
 *  que es un arreglo de URLs (array), dentro de ese arreglo,
 *  tomar la primera posición y realizar la llamada a ese URL,
 *  el cual debería de traer información sobre su especie (Human)
 */

// Respuesta esperada:
// Información sobre los humanos en el universo de Star Wars
// Ejemplo de la data esperada
/*
 { name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
*/

// Respuesta esperada con Mayor dificultad
// Retornar el siguiente objeto con la información de ambas peticiones
// Recordando que se disparan una después de la otra,
// con el URL que viene dentro del arreglo de 'species'

// Tip: investigar sobre la función zip:
//      Que permite combinar observables en un arreglo de valores
// https://rxjs-dev.firebaseapp.com/api/index/function/zip

// Ejemplo de la data esperada:
/*
    especie: {name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
    personaje: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
*/

(() => {
  // No tocar ========================================================
  const SW_API = "https://swapi.dev/api";
  const getRequest = (url: string) => ajax.getJSON<any>(url);
  // ==================================================================

  /* RESPUESTA ESPERADA */
  // Realizar el llamado al URL para obtener a Luke Skywalker
  /* se está usando starships ya que species viene como un arreglo vacío */
  // getRequest(`${SW_API}/people/1`)
  //   .pipe(
  //     switchMap((requestResponse) => getRequest(requestResponse.starships[0]))
  //   )
  //   .subscribe(console.log);

  /* RESPUESTA ESPERADA CON MAYOR DIFICULTAD */
  /* USANDO EL zip() que ya no estará en la versión 8 */
  /* se manda el requestResponse en un of() ya que al zip se le pueden pasar Observable, Promise, ReadableStream, Array, AsyncIterable, o Iterables */
  // getRequest(`${SW_API}/people/1`)
  //   .pipe(
  //     switchMap((requestResponse) => {
  //       return zip(
  //         of(requestResponse), // posición 0 de la emisión es el personaje
  //         getRequest(requestResponse.starships[0]) // posición 1 de la emisión es la nave espacial
  //       );
  //     }),
  //     map(([personaje, naveEspacial]) => ({ personaje, naveEspacial })) // se está haciendo la desestructuración de un array y luego retornando de forma implícita un objeto con esos nombres
  //   )
  //   .subscribe(console.log);

  /* USANDO EL combineLatestWith() que ya no estará en la versión 8 */
  /* se manda el requestResponse en un of() ya que al combineLatestWith se le pueden pasar Observable, Promise, ReadableStream, Array, AsyncIterable, o Iterables */
  getRequest(`${SW_API}/people/1`)
    .pipe(
      switchMap((requestResponse) => {
        /* posición 0 de la emisión es la nave espacial */
        return getRequest(requestResponse.starships[0]).pipe(
          /* posición 1 de la emisión es el personaje */
          combineLatestWith(of(requestResponse))
        );
      }),
      map(([naveEspacial, personaje]) => ({ naveEspacial, personaje })) // se está haciendo la desestructuración de un array y luego retornando de forma implícita un objeto con esos nombres
    )
    .subscribe(console.log);
})();
