import {
  catchError,
  fromEvent,
  map,
  of,
  tap,
  mergeMap,
  switchMap,
  exhaustMap,
} from "rxjs";
import { ajax } from "rxjs/ajax";

/* creando formulario */
const form = document.createElement("form");
const inputEmail = document.createElement("input");
const inputPassword = document.createElement("input");
const btnSubmit = document.createElement("button");

/* configuraciones a campos:  */
inputEmail.type = "email";
inputEmail.placeholder = "Escribir tu email...";
inputEmail.value = "eve.holt@reqres.in"; // https://reqres.in --- login successful

inputPassword.type = "password";
inputPassword.placeholder = "Escribir tu password...";
inputPassword.value = "cityslicka"; // https://reqres.in --- login successful

btnSubmit.innerHTML = "Ingresar";

/* insertando en el HTML del formulario */
form.append(inputEmail, inputPassword, btnSubmit);

/* insertando en el HTML del proyecto */
const bodyApp = document.getElementById("app");
bodyApp?.append(form);

/* helper and interface */
interface InfoUser {
  email: string;
  password: string;
}
const requestLoginHttp = (inforUser: InfoUser) => {
  /* se hará un return de la petición ajax que me regresará un observable y por ser un observable se puede usar los pipe o el subscribe. Se hace el return porque el operador de aplanamiento tiene que recibir ese observable */
  return ajax.post("https://reqres.in/api/login?delay=1", inforUser).pipe(
    map((requestResponse) => requestResponse?.response?.token),
    catchError((error) => {
      console.log("error", error);
      return of("Info User not valid");
    })
  );
};

/* Streams o Flujo de Información */
/* crear un observable para estar pendiente del evento submit del formulario */
const submitForm$ = fromEvent<SubmitEvent>(form, "submit");
submitForm$
  .pipe(
    /* efecto secundario que no modifica el flujo de información que se emiten a través del observable. Se hará el preventDefault() */
    tap((event) => event.preventDefault()),
    /* operador de transformación de data para obtener el email y password del event */
    map((event) => {
      return {
        email: event.target[0].value,
        password: event.target[1].value,
      };
    }),
    /* operador de aplanamiento porque en su interior tendrá un observable que será una petición ajax. Se utiliza un operador de aplanamiento para manejar la suscripción interna al observable dado por le petición ajax. Se utiliza el exhaustMap() para evitiar que se emitan varios valores si aún no se terminió la suscripción interna anterior del observable dado por la petición ajax */
    // mergeMap((inforUser) => requestLoginHttp(inforUser)) // si se realizan 5 clicks seguidos en el button Submit entonces se realizan 5 peticiones ya que el mergeMap() puede tener cualquier cantidad de suscripciones internas activas simultáneamente
    // switchMap((inforUser) => requestLoginHttp(inforUser)) // si se realizan 5 clicks seguidos en el button Submit entonces se realiza 1 petición ya que el switchMap() solo puede tener una suscripción interna activa. El switchMap() si se hacen nuevas emisiones entonces cancelará las anteriores y se quedará con la última
    exhaustMap((inforUser) => requestLoginHttp(inforUser)) // si se realizan 5 clicks seguidos en el button Submit entonces se realiza 1 petición ya que el exhaustMap() solo puede tener una suscripción interna activa y las anteriores no las tomará en cuenta y cuando se termine la suscripción y se tenga la respuesta entonces recién puedo hacer una nueva suscripción y por ende se hará una nueva petición y tendré una nueva respuesta
  )
  .subscribe(
    /* la api de https://reqres.in/api/login?delay=1 le mando un usuario con email y password y en su respuesta me tendría que dar un token de acceso, por eso se coloca como token, aunque puede ser llamado response, o requestResponse, etc */
    (token) => console.log("requestResponse", token)
  );
