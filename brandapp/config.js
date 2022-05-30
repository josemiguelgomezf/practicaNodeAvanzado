module.exports = {
    MONGODB: process.env.MONGODB || 'mongodb://localhost/cursonode',
    JWTPASS: process.env.JWTPASS || '12345ABCD',
    EMAILFROM: process.env.EMAILFROM || 'josemiguel.gmezfdez@gmail.com',
    RABBITMQ: process.env.RABBITMQ || 'amqps://lfegetzt:9gvzGcp5ll9-m6EzHoCtupYFFZpyXzEd@cow.rmq2.cloudamqp.com/lfegetzt',
    IMAGE_URL_BASE_PATH: process.env.IMAGE_URL_BASE_PATH || '/public/images/anuncios/'

  }