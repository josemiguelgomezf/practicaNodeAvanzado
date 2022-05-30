# BrandApp

To start the application use:

```sh
npm install
```

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

## Inicilizar la BD

Para inicializar la BD al estado inicial, se puede usar el comando:

```sh
npm run initdb
```

* ATENCION * Esto borrará todos los datos de la BD y cargará el estado inicial.

## Métodos del API

El API se accede en /api

Login:

- /api/login

Lista de anuncios:
(Añadir el token recibido tras el login)

- /api/ads

