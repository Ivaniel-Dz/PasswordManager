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
> Desplegar para ver detalles sobre las peticiones y respuestas de ejemplo para cada endpoint.

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
https://localhost:44369
```

```pgsql
**Authorization**: Bearer Token <TOKEN_JWT_VALIDO>
```
---

### Password: GET
> Obtener la lista de Contraseñas