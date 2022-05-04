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

escribeTras2Segundos('texto1', function() {
  escribeTras2Segundos('texto1', function() {
    console.log('fin');
  });
});
