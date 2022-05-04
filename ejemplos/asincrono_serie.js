'use strict';

console.log('empiezo');

// función que escribe un texto en la consola tras 2 segundos
function escribeTras2Segundos(texto, callback) {
  setTimeout(() => {
    console.log(texto);
    // hemos terminado, llamamos al callback
    callback();
  }, 2000)
}

// llamar n veces a la función fn
function serie(n, fn, callbackFinalizacion) {
  if (n == 0) {
    callbackFinalizacion();
    return; // termino
  }
  n = n -1;
  fn('texto' + n, () => {
    serie(n, fn, callbackFinalizacion);
  })
}

serie(5, escribeTras2Segundos, () => {
  console.log('fin');
});


