# Password Manager: Server

## Instalación del Proyecto en Local:
### Restaurar dependencias
```bash
dotnet restore
```
###  Verificar dependencias instaladas
```bash
dotnet list package
```

### Agrega las migraciones
```bash
Add-Migration "PrimeraMigracion"
```

### Actualiza la Base de Datos
```bash
Update-Database
```
> Si no tiene la base de datos creada, lo crea o si ya lo tiene solo agrega las tablas.

### Ejecuta el Proyecto
- Desde Visual Studio
- o Por Comando:
```bash
dotnet watch run
```

### Remueve las Migraciones (Opcional)
```bash
Remove-Migration
```
> Si tienes problemas con la creación de las tablas o base de datos, elimina las migraciones para crear las tablas sin errores.

## Ejemplos de peticiones y respuestas
> Desplegar para ver detalles sobre las peticiones y respuestas de ejemplo para cada endpoint. Revisar su numero de puerto: localhost:``port`` para evitar error al ejecutar los endPoint.

### Registro: POST
> Registrar Usuario
```bash
https://localhost:44369/api/Auth/Registro
```
```json
{
  "nombre": "string",
  "correo": "string",
  "clave": "string",
  "confirClave": "string"
}
```

###  Login: POST
> Inicio de Session
```bash
https://localhost:44369/api/Auth/Login
```

```json
{
  "correo": "string",
  "clave": "string"
}
```

### Usuario: Get
> Obtener los datos del Usuario Autenticado
```bash
https://localhost:44369/api/Usuario/Perfil
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

### Usuario: PUT
> Actualizar los datos del Usuario
```bash
https://localhost:44369/api/Usuario/Update
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```
> el ``id`` del usuario es obligatorio, los demás campos son opcionales según el dato a actualizar. 
```json
{
    "id": 1,
    "nombre": "Nuevo Nombre",
    "correo": "correoexistente@example.com", 
    "clave": "nuevaclave123"
}
```

### Usuario: DELETE
> Eliminar Cuenta del Usuario
```bash
https://localhost:44369/api/Usuario/Delete/id
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```
-----------------

### Tarjeta: GET
> Obtener la lista de Tarjetas
```bash
https://localhost:44369/api/Tarjeta/GetAll
```

> Buscar Tarjetas por termino
```bash
https://localhost:44369/api/Tarjeta/GetAll?term=banco
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

### Tarjeta: GET
> Obtener una tarjeta
```bash
https://localhost:44369/api/Tarjeta/Get/id
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

### Tarjeta: POST
> Agregar Tarjeta Nueva
```bash
https://localhost:44369/api/Tarjeta/Add
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

```json
{
  "numeracion": "string",
  "fechaExpiracion": "2025-04-26",
  "nombreTitular": "string",
  "nombreTarjeta": "string",
  "descripcion": "string",
  "redId": 0,
  "tipoId": 0
}
```

### Tarjeta: PUT
> Actualizar Tarjeta
```bash
https://localhost:44369/api/Tarjeta/Update
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```
> el ``id`` de la ``Tarjeta`` es obligatorio, los demás campos son opcionales según el dato a actualizar. 
```json
{
  "id": 0,
  "numeracion": "string",
  "fechaExpiracion": "2025-04-26",
  "nombreTitular": "string",
  "nombreTarjeta": "string",
  "descripcion": "string",
  "redId": 0,
  "tipoId": 0
}
```

### Tarjeta: DELETE
> Eliminar Tarjeta
```bash
https://localhost:44369/api/Tarjeta/Delete/id
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```
------------------

### Password: GET
> Obtener la lista de Contraseñas
```bash
https://localhost:44369/api/Password/GetAll
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

### Password: GET
> Obtener una Contraseña
```bash
https://localhost:44369/api/Password/Get
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

### Password: POST
> Agregar Nueva Contraseña
```bash
https://localhost:44369/api/Password/Add
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

```json
{
  "nombre": "string",
  "url": "string",
  "userEmail": "string",
  "clave": "string",
  "notas": "string",
  "categoriaId": 0
}
```

### Password: PUT
> Actualizar Contraseña
```bash
https://localhost:44369/api/Password/Update/id
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```

```json
{
  "nombre": "string",
  "url": "string",
  "userEmail": "string",
  "clave": "string",
  "notas": "string",
  "categoriaId": 0
}
```

### Password: DELETE
> Eliminar Contraseña
```bash
https://localhost:44369/api/Password/Delete/id
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```
---