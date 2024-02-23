/* usar el asyncScheduler no crea un observable sino que crea una suscripción, es decir, como un .subscribe() */
/* usar el asyncScheduler es como usar el setTimeout(() => {}, 3000); o el setInterval(() => {}, 3000); pero de una forma más controlada, podemos usar el producto de lo que haremos, podemos manejar la suscripción como cualquier otra suscripción de RxJS y al trabajar de forma asíncrona la app no se queda congelada ya que son procesos asíncronos, el resto del código continúa ejecutándose normal */
import { asyncScheduler } from "rxjs";

const saludar = () => console.log("Hola Mundo");
const saludar2 = (nombre: any) => console.log(`Hola ${nombre}`);
const saludar3 = (nombre: any) => console.log(`Hola ${nombre}`);
const saludar4 = (nombre: any, apellido: any) =>
  console.log(`Hola ${nombre} ${apellido}`);
const saludar5 = (nombre: any, apellido: any, edad: any) =>
  console.log(`Hola ${nombre} ${apellido} ${edad}`);

/* FORMA 1: forma directa */
/* pasar la función que quiero que se ejecute y después de 2seg. Darse cuenta que no se le está mandando argumentos ya que si se le manda saludar() o saludar(argumento) esos () harán que se ejecute inmediatamente la función y el asyncScheduler no funciona así */
asyncScheduler.schedule(saludar, 1000);
/* el tercer parámetro que tiene es el state o estado de lo que será mi schedule */
asyncScheduler.schedule(saludar2, 1000, "Nombre Enviado");
/* otra forma cuando se envián 1 o más parámetros usando el bind() */
asyncScheduler.schedule(saludar3.bind(this, "Nombre Enviado Bind"), 1000);
asyncScheduler.schedule(saludar4.bind(this, "Nombre", "Apellido"), 1000);
asyncScheduler.schedule(saludar5.bind(this, "Nombre", "Apellido", 20), 1000);

/* ************************************************************************************************************************ */

/* FORMA 2: recibe una función pero no puede ser una función de flecha */
const subscription = asyncScheduler.schedule(
  /* la función recibe el state */
  function (state) {
    console.log("state", state);

    /* también se puede mandar a llamar aquí al unsubscribe() mediante una validación */
    if (state === 5) {
      this.unsubscribe();
      console.log("complete");
    }

    /* para que trabaje como un setInterval() para que cada 1000ms = 1seg se cambie el valor del state. Si se comenta esta línea de código entonces trabajaría todo como un setTimeout(), es decir, para que después de 3seg recién se ejecute */
    /* este schedule recibe el valor del estado y el delay para que se vuelva a ejecutar */
    this.schedule(state! + 1, 1000);
  },
  2500, // intérvalo de tiempo para que se ejecute esta función, después de 3000ms = 3seg se ejecutará
  0 // estado o state inicial
);
console.log({ subscription });

/* FORMA 1: para desuscribirnos usando el setTimeout() */
// setTimeout(() => {
//   subscription.unsubscribe();
//   console.log("complete");
// }, 6000);

/* FORMA 2: usando el propio asyncScheduler para desuscribirnos usándolo como si fuera un setTimeout() */
// asyncScheduler.schedule(() => {
//   subscription.unsubscribe();
//   console.log("complete");
// }, 6000);

/* ************************************************************************************************************************ */
/* enviando un objeto de forma directa o sino también puede ser una variable que sea un objeto */
const subscription2 = asyncScheduler.schedule(
  /* la función recibe el state */
  function (state) {
    console.log("state", state);

    /* para que trabaje como un setInterval() para que cada 1000ms = 1seg se cambie el valor del state. Si se comenta esta línea de código entonces trabajaría todo como un setTimeout(), es decir, para que después de 3seg recién se ejecute */
    /* este schedule recibe el valor del estado y el delay para que se vuelva a ejecutar */
    this.schedule(state!, 1000);
  },
  9000, // intérvalo de tiempo para que se ejecute esta función, después de 3000ms = 3seg se ejecutará
  {
    nombre: "Nombre",
    apelido: "Apellido",
  } // estado o state inicial
);

asyncScheduler.schedule(() => {
  subscription2.unsubscribe();
  console.log("complete");
}, 13000);

/* ************************************************************************************************************************ */
const saludar6 = (name: any, lastname: any) =>
  console.log(`Hola ${name} ${lastname}`);

const subscription3 = asyncScheduler.schedule(
  (props) => saludar6(props?.name, props?.lastname),
  15000,
  { name: "Adolfo", lastname: "Blue" }
);

asyncScheduler.schedule(() => {
  subscription3.unsubscribe();
  console.log("complete");
}, 16000);
