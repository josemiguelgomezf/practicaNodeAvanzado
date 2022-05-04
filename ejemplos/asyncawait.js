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

async function main() {

  let result
  try {
    result = await sleep(3000)
  } catch(err) {
    console.log('Ha fallado un sleep (gulp)')
  }

  for (let i = 0; i < 5; i++) {
    await sleep(1000);
    console.log('acaba de pasar 1 segundo');
  }

  console.log(result);
  return sleep(1000)
}

main().catch(err => console.log('Hubo un error:', err))