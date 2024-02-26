/* el operador take(# veces) es útil cuando se quiere limitar la cantidad de emisiones que queremos que un observable tenga. Las emisiones posteriores al take(# veces) ya no llegarán a la suscripción incluso así haya un error ya que mi observable ya se completó y paró de emitir valores en un determinado número de veces take(# veces) */
import { of } from "rxjs";
import { take, tap } from "rxjs/operators";

const numeros$ = of(1, 2, 3, 4, 5);

numeros$
  .pipe(
    tap((number) => console.log("tap()", number)),
    take(3) // a la tercera emisión se completa el observable
  )
  .subscribe({
    next: (value) => console.log("next:", value),
    complete: () => console.log("complete"),
  });
