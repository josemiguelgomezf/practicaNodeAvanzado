'use strict';

// función que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve('resultado');
      // reject('he fallado');
    }, ms)
  })
}

const promesa = sleep(3000)

console.log(promesa);

promesa.then((result) => {
  console.log('pasaron los 3 segundos con result:', result);
  return sleep(3000) // retornamos la promesa que devuelve sleep
}).catch(err => {
  console.error('Hubo un error-1:', err);
}).then(() => {
  console.log('pasaron otros 3 segundos');
  return sleep(3000)
}).then(() => {
  console.log('pasaron otros 3 segundos más');
}).catch(err => {
  console.error('Hubo un error:', err);
});

Promise.all([sleep(2000), sleep(2000), sleep(2000)]).then(() => {
  console.log('han terminado todos los sleep')
})