import { fromEvent, map, /* mergeMap, */ of, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

/* Referencias para el DOM */
const bodyApp = document.getElementById("app");
const textInput = document.createElement("input");
const orderList = document.createElement("ol");
bodyApp?.append(textInput, orderList);

const url = "https://httpbin.org/delay/1?arg=";
/* para escuchar todo lo que suceda en el textInput mediante el evento "keyup" */
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup");

/* USANDO mergeMap() */
/* El operador mergeMap() se utiliza para transformar los valores emitidos por un observable en otros observables, y luego aplanar esos observables internos en uno solo. Esto significa que cada valor emitido por el observable fuente se mapeará a un nuevo observable, y los valores emitidos por estos observables internos se "aplanarán" en un único flujo observable */
/* FUNCIONAMIENTO:
  1. tiene un map para poder retornar lo que se está escribiendo en la caja de texto lo cual ingresa un KeyboardEvent y retorna un string
  2. tiene un mergeMap para que con el valor retornado del primer map se pueda hacer una petición ajax lo cual me va a regresar un observable, entonces el mergeMap aplanará el observable dado por la petición ajax, es decir, se va a suscribir al observable que da la petición ajax pero como en este observable de input$ no se está colocando un debounceTime() entonces se emitirán todos los valores que se vayan escribiendo en la caja de texto lo cual nos darán varias emisiones por cada letra escrita cuando nosotros solo queremos la última emisión lo cual en este caso no nos sería útil trabajar con el mergeMap() sino usar un switchMap()
  4. realiza la suscripción al observable inicial
*/

/* aquí se va a realizar una petición por cada valor que emite mi observable input$ (valor que se escriba en la caja de texto). Si se coloca con el debounceTime() se podría solucionar pero igual sería mejor trabajarlo con el switchMap() para obtener solo el último valor emitido por el observable interno que viene a ser dado por la petición ajax */
// input$
//   .pipe(
//     map((event) => {
//       const eventTarget = event.target as HTMLInputElement;
//       return eventTarget.value;
//     }),
//     mergeMap((texto) => {
//       if (!texto) return of();

//       // console.log({ texto });
//       return ajax.getJSON(url + texto);
//     })
//   )
//   .subscribe((response) => console.log("response", response));

/* USANDO switchMap() */
/* el operador switchMap() es un operador que recibe un callback que retorna un observable y ese nuevo observable es el que se va a suscribir para hacer la emisión en la salida. Por ejemplo, si se tiene un observable que emite un valor y automáticamente se va a suscrubir y mostrar los valores en la salida pero si el observable emite un nuevo valor entonces emitirá un nuevo observable el cual se va a suscribir y automáticamente se completa la suscripción anterior y sigue emitiendo los valores, y a diferencai del mergeMap() el switchMap() va a mantener un solo observable interno activo y suscrito y así sucesivamente. Al llamar al switchMap() va a cancelar la petición ajax anterior porque si realizamos 3 peticiones ajax de las cuales solo nos importa la última entonces se cancelarán las 2 peticiones anteriores y nos ahorramos datos y esa transferencia de información adicional */

/* aquí se va a realizar una petición final porque al momento de que mi observable input$ emita valores que son nuevos observables la petición anterior se cancela porque va completando los observables anteriores y por ende no recibimos esa información lo cual si tenemos un buscador y colocamos algo en la caja de texto entonces solo el último valor es el que se mantendrá hasta realizar una nueva búsqueda, igual sería bueno colocar un debounceTime() para que haga un delay */
input$
  .pipe(
    map((event) => {
      const eventTarget = event.target as HTMLInputElement;
      return eventTarget.value;
    }),
    switchMap((texto) => {
      if (!texto) return of();

      // console.log({ texto });
      return ajax.getJSON(url + texto);
    })
  )
  .subscribe((response) => console.log("response", response));
