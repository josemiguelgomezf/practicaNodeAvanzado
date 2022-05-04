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

// llamar a la función fn con cada elemento del array arr
function serie(arr, fn, callbackFinalizacion) {
  if (arr.length == 0) {
    callbackFinalizacion();
    return; // termino
  }

  fn('texto' + arr.shift(), () => {
    serie(arr, fn, callbackFinalizacion);
  })
}

serie([1,2,3,4,5], escribeTras2Segundos, () => {
  console.log('fin');
});


