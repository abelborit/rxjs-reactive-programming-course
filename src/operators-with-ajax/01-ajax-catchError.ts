import { ajax, AjaxError } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const url = "https://api.github.com/users?per_page=5";

// const manejaErrores = (response: Response) => {
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response;
// };

// const fetchPromesa = fetch(url);

// fetchPromesa
//   .then((resp) => resp.json())
//   .then((data) => console.log("data:", data))
//   .catch((err) => console.warn("error en usuarios", err));

// fetchPromesa
//   .then(manejaErrores)
//   .then((resp) => resp.json())
//   .then((data) => console.log("data:", data))
//   .catch((err) => console.warn("error en usuarios", err));

/* si en la petición a la URL aparece error "blocked by CORS policy" simplemente hay que añadir en la petición ajax el objeto con los valores de configuración de la propia dirección url y crossDomain: true, es decir, ajax({url,crossDomain:true}) */
ajax(url)
  .pipe(
    map((responseRequest) => responseRequest.response),
    catchError((err: AjaxError) => {
      console.warn("error en:", err.message);
      return of([]);
      // return of(err);
    }) // catchError() atrapa cualquier error en el observable, inluídas las peticiones HTTP. El catchError() tiene que retornar un error o un nuevo observable y en este caso se usa el of([])
  )
  .subscribe((users) => console.log("usuarios:", users));

/* ************************************************************************************************************************ */
/* ¿Cuál es la diferencia entre ajax con rxjs vs axios o fetch api? */
/* 
  - Esta comparación entre las opciones es muy útil para diferenciar sus características: https://gist.github.com/StevenACoffman/3122621eceffa18fcb80c3249bef7bd5 

  - Cuando usar uno u otro dependerá de las necesidades, Ajax tiene como ventaja que nos permite crear aplicaciones de una sola página, no hay necesidad de instalaciones extras y es lo más cercano a la experiencia nativa.

  - El Fetch API es lo que usa se usa para el fetch que conocemos, esta proporciona un metodo global que es fetch y este hace uso de los objetos Request y Response. Por otro lado Ajax usa el objeto XMLHttpRequest (y otras tecnologias pero esto es su punto central).
*/
