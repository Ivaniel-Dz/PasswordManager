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

## Probar cada endpoint

###  Prueba de Registro (POST /api/auth/register)
###  Prueba de Login (POST /api/auth/login)
### Prueba de Password