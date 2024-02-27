import { ajax } from "rxjs/ajax";

/* aquí se obtendría la data directamente */
const url_user = "https://api.github.com/users?per_page=5";
const observable1$ = ajax.getJSON(url_user);
observable1$.subscribe((data) => console.log("data:", data));

/* esta url porque nos da más información, por ejemplo, lo que nos regresa nos da propiedades como headers que enviamos automáticamente desde nuestro navegador, data que enviamos en una petición POST - PUT - DELETE, etc */
const url = "https://httpbin.org/delay/1"; // https://httpbin.org/

/* aquí se le están mandando opciones en el header para la url */
const observable$ = ajax.getJSON(url, {
  "Content-Type": "application/json",
  "mi-token": "ABC123",
});

observable$.subscribe((data) => console.log("data:", data));
