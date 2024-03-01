import { ajax } from "rxjs/ajax";
import { startWith } from "rxjs/operators";

/* crear el elemento HTML */
const loadingDiv = document.createElement("div");
loadingDiv.classList.add("loading");
loadingDiv.innerHTML = "Cargando...";

const bodyApp = document.getElementById("app");

/* Streams o Flujo de Información */
ajax
  .getJSON("https://reqres.in/api/users/2?delay=2")
  .pipe(startWith(true))
  .subscribe((requestResponse) => {
    /* en ambas formas se tiene que colocar sí o sí requestResponse === true ya que el valor inicial de requestResponse antes de que se haga la primera emisión es un boolean true y luego cuando ya se haga la emisión de la petición será un objeto que también es un valor truthy, es por eso que se iguala exactamente al valor true ya que si solo se hace requestResponse entonces siempre estaría como un valor truthy ya que ambos valores (objeto y true) son truthy */

    /* FORMA 1 */
    // if (requestResponse === true) {
    //   bodyApp?.append(loadingDiv);
    // } else {
    //   document.querySelector(".loading").remove();
    // }

    /* FORMA 2 */
    requestResponse === true
      ? bodyApp?.append(loadingDiv)
      : document.querySelector(".loading")?.remove();

    console.log(requestResponse);
  });
