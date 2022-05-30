# NodeApp

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

Lista de agentes:

- /api/agentes

Filtros:
- http://localhost:3000/api/agentes/?name='Smith'&age=30

Paginación:
- http://localhost:3000/api/agentes/?skip=4&limit=2

Eligiendo que campos quiero:
- http://localhost:3000/api/agentes/?select=name -_id address

Ordenación:
- http://localhost:3000/api/agentes/?sort=name age


Buscar un agente por ID:

- /api/agentes/:id

Crear un agente:

- POST /api/agentes

Eliminar un agente:

- DELETE /api/agentes/:id