import { catchError, of } from "rxjs";
import { AjaxError, ajax } from "rxjs/ajax";

/* esta url (https://httpbin.org/) porque nos da más información, por ejemplo, lo que nos regresa nos da propiedades como headers que enviamos automáticamente desde nuestro navegador, data que enviamos en una petición POST - PUT - DELETE, etc */
const url = "https://httpbin.org/delay/1"; // good url
// const url = "https://httpbin.org/delasdasdasdhjgbhjay/1"; // bad url

const handleErrors = (error: AjaxError) => {
  console.warn("error:", error.message);

  /* siempre es bueno regresar algo para que mis suscripciones o mis siguientes operadores puedan seguir trabajando de alguna manera */
  return of({
    ok: false,
    users: [],
  });
  // return of(error);
};

const observable1$ = ajax.getJSON(url).pipe(catchError(handleErrors));
const observable2$ = ajax(url).pipe(catchError(handleErrors));

observable1$.subscribe((data) => console.log("getJSON:", data));
observable2$.subscribe((data) => console.log("ajax:", data));
