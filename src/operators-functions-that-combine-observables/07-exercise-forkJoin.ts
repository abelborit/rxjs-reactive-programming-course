/* el caso de uso más común que tiene el forkJoin() es realizar peticiones ajax de manera simultánea */
import { forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, retry } from "rxjs/operators";

const GITHUB_API_URL = "https://api.github.com/users";
const GITHUB_USER = "klerith";

/* el forkJoin() va a aplanar los observables que regresan de la petición ajax y se obtendrán las emisiones de esos observables. Si hay un error en la petición entonces todo el forkJoin() fallará pero hay que tener presente que las otras peticiones sí se llegan a realizar (comentar el pipe con el catchError de repos y luego ir a la pestaña de network de Google Chrome y estarán las peticiones con éxito y las peticiones con error), hay que tener cuidado en ese aspecto, por eso es mejor controlar lo errores tanto de forma general y los errores de forma individual para tener las respuestas de los demás observables */
forkJoin({
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  repos: ajax
    .getJSON(
      `${GITHUB_API_URL}/${GITHUB_USER}/repos` // good API
      // `${ GITHUB_API_URL }/${ GITHUB_USER }/repo123123s` // error API
    )
    .pipe(
      retry(2), // reintentar 2 veces la emisión del observable en caso haya algún error
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    ),
  gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
})
  .pipe(catchError((error) => of(error)))
  .subscribe((response) => console.log("response", response));
