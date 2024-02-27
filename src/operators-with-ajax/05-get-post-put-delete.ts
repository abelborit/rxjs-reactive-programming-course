import { ajax } from "rxjs/ajax";

const url = "https://httpbin.org/delay/1";

/* FORMA 1: mediante parámetros */
ajax
  .get(url)
  .subscribe((response) => console.log("response - get:", response.response));

ajax
  .post(url, { id: 1, nombre: "Nombre" }, { "mi-token": "ABC123" })
  .subscribe((response) => console.log("response - post:", response.response));

ajax
  .put(url, { id: 1, nombre: "Nombre" }, { "mi-token": "ABC123" })
  .subscribe((response) => console.log("response - put:", response.response));

ajax
  .delete(url, { "mi-token": "ABC123" })
  .subscribe((response) =>
    console.log("response - delete:", response.response)
  );

/* FORMA 2: mediante objetos */
ajax({
  url: url,
  method: "POST",
  headers: { "mi-token": "ABC123" },
  body: { id: 1, nombre: "Nombre" },
}).subscribe((response) => console.log("response - post:", response.response));

ajax({
  url: url,
  method: "DELETE", // la ventaja de trabjarlo así y con DELETE es que aquí me permite enviar el body
  headers: { "mi-token": "ABC123" },
  body: { id: 1, nombre: "Nombre" },
}).subscribe((response) =>
  console.log("response - delete:", response.response)
);

/* de esta forma veremos que los datos que le enviamos en la petición POST se ven en la propiedad form de la response ya que arriba aparece en la propiedad data */
const formData = new FormData();
formData.append("campo1", "valor1");
formData.append("campo2", "valor2");

ajax
  .post(url, formData)
  .subscribe((response) =>
    console.log("response - post - FormData:", response.response)
  );
