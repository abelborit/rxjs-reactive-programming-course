import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  mergeAll,
  of,
} from "rxjs";
import { GithubUser } from "./interfaces/github-user.interface";
import { ajax } from "rxjs/ajax";
import { GithubUsersResp } from "./interfaces/github-users.interface";

/* Referencias para el DOM */
const bodyApp = document.getElementById("app");
const textInput = document.createElement("input");
const orderList = document.createElement("ol");
bodyApp?.append(textInput, orderList);

/* para escuchar todo lo que suceda en el textInput mediante el evento "keyup" */
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup");

/* FORMA 1: Streams o Flujos de Información anidado (observable -> subscribe -> observable -> subscribe -> ..........) */
/* FUNCIONAMIENTO:
  1. tiene un debounceTime de 500ms para no emitir valores dentro de ese rango de tiempo y no consumir recursos de forma innecesaria
  2. tiene un primer map para poder retornar lo que se está escribiendo en la caja de texto lo cual ingresa un KeyboardEvent y retorna un string
  3. tiene el distinctUntilChanged para que emita valores siempre y cuando la emisión anterior inmediata no sea la misma
  4. tiene un segundo map para que con el valor retornado del primer map se pueda hacer una petición ajax lo cual me va a regresar un observable, entonces en el segundo map ingresará un string y saldrá un observable
  5. realiza la suscripción al observable emitido por la petición ajax
  6. tiene un map para poder retornar solo la url y el name
*/
// input$
//   .pipe(
//     debounceTime<KeyboardEvent>(500),
//     map<KeyboardEvent, string>((event) => {
//       // console.log({ event });
//       /* se coloca el event.target as HTMLInputElement para que sepa a qué elemento html hacemos referencia que en este caso es un input y luego retornamos su value */
//       const eventTarget = event.target as HTMLInputElement;
//       return eventTarget.value;
//     }),
//     distinctUntilChanged(), // para que emita valores siempre y cuando la emisión anterior inmediata no sea la misma
//     map<string, Observable<GithubUser>>((texto) => {
//       // console.log({ texto });
//       return ajax.getJSON(`https://api.github.com/users/${texto}`);
//     })
//   )
//   .subscribe((responseRequest) => {
//     /* aquí nos damos cuenta que el map anterior con la petición ajax nos está regresando un nuevo observable entonces tendríamos que suscribirnos nuevamente a ese nuevo observable para poder emitir un valor, y si ese valor por ejemplo es la url del usuario entonces tendríamos que pasarlo por un pipe */
//     // console.log(responseRequest);
//     responseRequest
//       .pipe(
//         map((responseRequest) => {
//           // console.log({ responseRequest });
//           return { url: responseRequest.url, name: responseRequest.name };
//         })
//       )
//       .subscribe((infoUser) => console.log(infoUser));
//   });

/* FORMA 2: Streams o Flujos de Información usando operadores de aplanamiento */
/* Helpers */
const mostrarUsuariosEnHTML = (usuarios: GithubUser[]) => {
  console.log(usuarios);
  orderList.innerHTML = "";

  for (const usuario of usuarios) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = usuario.avatar_url;

    const anchor = document.createElement("a");
    anchor.href = usuario.html_url;
    anchor.text = "Ver página";
    anchor.target = "_blank";

    li.append(img);
    li.append(usuario.login + " ");
    li.append(anchor);

    orderList.append(li);
  }
};

/* Todos los observables que tenga el mergeAll() se completen recién se va a disparar el complete de mis suscripción inicial */
/* FUNCIONAMIENTO:
  1. tiene un debounceTime de 500ms para no emitir valores dentro de ese rango de tiempo y no consumir recursos de forma innecesaria
  2. tiene un primer map para poder retornar lo que se está escribiendo en la caja de texto lo cual ingresa un KeyboardEvent y retorna un string
  3. tiene el distinctUntilChanged para que emita valores siempre y cuando la emisión anterior inmediata no sea la misma
  4. tiene un segundo map para que con el valor retornado del primer map se pueda hacer una petición ajax lo cual me va a regresar un observable, entonces en el segundo map ingresará un string y saldrá un observable
  5. tiene un mergeAll que se va a suscribir al observable que retorna el map por la petición ajax y se va a suscribir a dichos valores y que cuando se completen también se completará el mergeAll
  6. tiene un tercer map para que pueda retornar solo los valores que nosotros necesitamos en base a lo que nos regresó el mergeAll
  7. realiza la suscripción al observable inicial
*/
/* aquí se está colocando un tipado a todo para fines de práctica pero solo sería necesario al momento de que entra la información por ejemplo en el fromEvent<KeyboardEvent> y cuando sale la información en el map<GithubUsersResp, GithubUser[]>() y ya no en el centro ya que la información que fluye puede variar entonces se tendrían que cambiar el orden de los operadores y por ende su tipado */
input$
  .pipe(
    debounceTime<KeyboardEvent>(500),
    map<KeyboardEvent, string>((event) => {
      // console.log({ event });
      /* se coloca el event.target as HTMLInputElement para que sepa a qué elemento html hacemos referencia que en este caso es un input y luego retornamos su value */
      const eventTarget = event.target as HTMLInputElement;
      return eventTarget.value;
    }),
    distinctUntilChanged(), // para que emita valores siempre y cuando la emisión anterior inmediata no sea la misma
    map<string, Observable<GithubUsersResp>>((texto) => {
      if (!texto) return of(); // si no hay texto entonces que no retorne nada porque sino da error en la petición ajax

      // console.log({ texto });
      return ajax.getJSON(`https://api.github.com/search/users?q=${texto}`);
    }),
    mergeAll<Observable<GithubUsersResp>>(),
    map<GithubUsersResp, GithubUser[]>((response) => response.items)
  )
  .subscribe((usuarios) => mostrarUsuariosEnHTML(usuarios));
