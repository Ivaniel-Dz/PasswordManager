# Password Manager: Client

## Instalación de un proyecto Angular con Bootstrap en local

### 1. Instalar dependencias
El proyecto probablemente usa Bootstrap y posiblemente alguna librería como ng-bootstrap o ngx-bootstrap:

```bash
npm install
```

Esto instalará todas las dependencias listadas en el `package.json`, incluyendo Angular, Bootstrap y cualquier otra librería que el proyecto utilice.

### 2. Verificar la configuración de Bootstrap
Revisa cómo está configurado Bootstrap en el proyecto:

- **angular.json**: Busca las referencias a Bootstrap en las secciones `styles` y `scripts`
- **package.json**: Verifica qué versiones de Bootstrap y complementos están instalados
- **app.module.ts**: Comprueba si importa algún módulo de ng-bootstrap o ngx-bootstrap

### 3. Ejecutar el proyecto
```bash
ng serve
```

Luego abre tu navegador en `http://localhost:4200`

## Posibles problemas y soluciones

### Si faltan dependencias específicas:
```bash
# Si usa Bootstrap estándar
npm install bootstrap @popperjs/core

# Si usa ng-bootstrap
npm install @ng-bootstrap/ng-bootstrap

# Si usa ngx-bootstrap
npm install ngx-bootstrap
```

### Si hay errores de versiones:
- Revisa el `package.json` para ver las versiones exactas
- Instala versiones específicas con `npm install bootstrap@5.3.0` (por ejemplo)

### Si los estilos no se cargan:
- Verifica que `angular.json` tenga la ruta correcta a los archivos CSS de Bootstrap
- Asegúrate que las rutas en `styles` apunten a `node_modules/bootstrap/dist/css/bootstrap.min.css`

## Configuración típica que deberías encontrar

En `angular.json`:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/@popperjs/core/dist/umd/popper.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```

En `app.module.ts` (si usa ng-bootstrap):
```typescript
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgbModule, ...],
  ...
})
```

