import { catchError, of } from "rxjs";
import { AjaxError, ajax } from "rxjs/ajax";

/* esta url (https://httpbin.org/) porque nos da más información, por ejemplo, lo que nos regresa nos da propiedades como headers que enviamos automáticamente desde nuestro navegador, data que enviamos en una petición POST - PUT - DELETE, etc */
// const url = "https://httpbin.org/delay/1"; // good url
const url = "https://httpbin.org/delasdasdasdhjgbhjay/1"; // bad url

const handleErrors = (error: AjaxError) => {
  console.warn("error:", error.message);

  /* siempre es bueno regresar algo para que mis suscripciones o mis siguientes operadores puedan seguir trabajando de alguna manera */
  return of({
    ok: false,
    users: [],
  });
  // return of(error);
};

/* FORMA 1: usando catchError() */
// const observable1$ = ajax.getJSON(url).pipe(catchError(handleErrors));
// const observable2$ = ajax(url).pipe(catchError(handleErrors));

// observable1$.subscribe((data) => console.log("getJSON:", data));
// observable2$.subscribe((data) => console.log("ajax:", data));

/* FORMA 2: usando error: ()=> {} del subscribe */
// const observable3$ = ajax.getJSON(url);
// const observable4$ = ajax(url);

// observable3$.subscribe({
//   next: (data) => console.log("getJSON:", data),
//   error: (error) => console.log("getJSON:", error),
//   complete: () => console.log("getJSON - complete"),
// });

// observable4$.subscribe({
//   next: (data) => console.log("ajax:", data),
//   error: (error) => console.log("ajax:", error),
//   complete: () => console.log("ajax - complete"),
// });

/* FORMA 3: usando el catchError() y error: ()=> {} del subscribe */
const observable5$ = ajax.getJSON(url);
const observable6$ = ajax(url);

observable5$.pipe(catchError(handleErrors)).subscribe({
  next: (data) => console.log("getJSON:", data),
  error: (error) => handleErrors(error),
  complete: () => console.log("getJSON - complete"),
});

observable6$.pipe(catchError(handleErrors)).subscribe({
  next: (data) => console.log("ajax:", data),
  error: (error) => handleErrors(error),
  complete: () => console.log("ajax - complete"),
});

/* ************************************************************************************************************************ */
/* ¿Cuál es la diferencia entre catchError y error del subscribe? */
/* 
  - Usando el catchError() vemos que se dispara el error de la función handleErrors del catchError(), también se dispara el next y se completa el observable, no se dispara el error del subscribe porque ya lo estamos manejando con el catchError()
  - El catchError atrapa el error en la cadena de pipes y puede retornar otro observable diferente evitando que se reciba un error en el subscribe o catch del subscribe. Ese es su uso principal, poder controlar un posible error en el flujo.

  - Usando el error del subscribe vemos que la petición ajax está fallando entonces no se lanza el next y tampoco se dispara el complete
  - El catch en el observable es para trabajar con la excepción no controlada del observable (que no tiene catchError)
*/
