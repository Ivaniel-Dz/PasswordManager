**Documentación del Proyecto: Password Manager**

---

### 1. Objetivo del Proyecto
El objetivo principal de este proyecto es desarrollar un gestor de contraseñas seguro y eficiente que permita a los usuarios almacenar, generar y gestionar sus contraseñas de manera protegida. Además, el sistema está diseñado para proporcionar funcionalidades adicionales, como el almacenamiento de tarjetas (crédito, débito o prepago) y un sistema de búsqueda avanzado que facilita el filtrado de los datos almacenados.

El gestor está pensado para mejorar la seguridad digital de los usuarios al centralizar y proteger información sensible en un entorno seguro, eliminando la necesidad de recordar múltiples contraseñas o datos de tarjetas.

---

### 2. Tecnologías Utilizadas

#### **Framework**
- **ASP.NET Core MVC**: Framework principal utilizado para desarrollar la aplicación web. Ofrece un entorno modular y escalable para construir aplicaciones web seguras y de alto rendimiento.

#### **Lenguajes de Programación**
- **C#**: Lenguaje principal para el desarrollo del backend y la lógica de negocio.
- **HTML5**: Lenguaje de marcado para la estructura de las vistas y componentes.
- **CSS3**: Para el diseño y estilizado de la interfaz de usuario.
- **JavaScript**: Utilizado para agregar interactividad y funcionalidades dinámicas en el frontend.

#### **Base de Datos**
- **SQL Server**: Sistema de gestión de bases de datos relacional utilizado para almacenar información de usuarios, contraseñas y tarjetas de manera segura. La base de datos se encuentra diseñada con relaciones y restricciones que garantizan la integridad de los datos.

#### **Librerías y Herramientas Adicionales**
- **Entity Framework Core**: ORM utilizado para interactuar con la base de datos de forma eficiente y sin necesidad de escribir consultas SQL manualmente.
- **Microsoft Identity**: Implementado para la autenticación y gestión de usuarios.
- **Bootstrap**: Framework de CSS utilizado para garantizar un diseño responsivo y amigable para el usuario.
- **SHA256**: Algoritmo de hash utilizado para cifrar las contraseñas antes de almacenarlas en la base de datos.
- **AES**: Algoritmo de cifrado utilizado para proteger datos sensibles como contraseñas y tarjetas de crédito.

---

### 3. Funcionalidades Principales

1. **Almacenamiento Seguro**:
   - Permite a los usuarios guardar contraseñas asociadas a diferentes cuentas o servicios.
   - Posibilidad de almacenar información adicional como datos de tarjetas (crédito, débito o prepago).

2. **Generador de Contraseñas**:
   - Genera contraseñas seguras y personalizables con diferentes opciones como longitud, uso de caracteres especiales, números, letras mayúsculas y minúsculas.
   - Incluye la opción de agregar palabras clave adicionales para facilitar el recuerdo de contraseñas complejas.

3. **Búsqueda y Filtrado**:
   - Los usuarios pueden buscar rápidamente contraseñas o datos almacenados mediante un sistema de filtrado eficiente.

4. **Autenticación Segura**:
   - Sistema de autenticación basado en cookies y con hashing de contraseñas para garantizar la protección de las credenciales de los usuarios.

5. **Interfaz Intuitiva**:
   - Diseño moderno y responsivo que facilita la navegación y la experiencia del usuario.

6. **Cierre de Sesión Seguro**:
   - Proporciona una funcionalidad para que los usuarios cierren sesión de manera segura, eliminando cualquier token de autenticación activo.

---

### 4. Arquitectura del Sistema
El proyecto sigue una arquitectura basada en el patrón **MVC (Model-View-Controller)**:

- **Model**: Representa las entidades de datos como usuarios, contraseñas y tarjetas, y define la estructura de la base de datos.
- **View**: Define las vistas de usuario, incluyendo formularios, listas y diseños responsivos.
- **Controller**: Contiene la lógica de negocio y sirve como intermediario entre las vistas y los modelos.

Además, se implementa una separación clara de responsabilidades mediante el uso de servicios dedicados para tareas como hashing de contraseñas y cifrado de datos.

---

### 5. Seguridad

El proyecto pone énfasis en la seguridad mediante las siguientes medidas:

- **Cifrado de Contraseñas**:
  - Las contraseñas se almacenan como hashes utilizando SHA256, lo que asegura que no se puedan revertir a texto plano.

- **Cifrado de Datos Sensibles**:
  - Datos como contraseñas y tarjetas se cifran utilizando AES antes de ser almacenados.

- **Autenticación**:
  - Se utiliza autenticación basada en cookies con tokens seguros para mantener las sesiones activas.

- **Validación de Entradas**:
  - Todas las entradas del usuario se validan para evitar ataques como inyecciones SQL o XSS.

---

### 6. Cambios a Futuro

1. **Recuperación de Contraseña**:
   - Implementar un sistema de recuperación de contraseña para usuarios que olviden sus credenciales.
   - Enviar enlaces seguros por correo electrónico para restablecer la contraseña.

2. **Numeración de Pie de Páginas**:
   - Agregar numeración automática en las vistas de listas largas para facilitar la navegación.

3. **Soporte Multiusuario**:
   - Permitir que un usuario pueda compartir contraseñas de forma segura con otros usuarios registrados.

4. **Autenticación Multifactor (MFA)**:
   - Mejorar la seguridad implementando autenticación de dos factores (2FA) mediante aplicaciones como Google Authenticator o SMS.

5. **Historial de Contraseñas**:
   - Implementar un sistema que registre los cambios realizados en las contraseñas y permita restaurar versiones anteriores.

6. **Soporte para Múltiples Idiomas**:
   - Internacionalizar la aplicación para que pueda ser utilizada por usuarios de diferentes países.

7. **Integración con Navegadores**:
   - Desarrollar extensiones para navegadores que permitan el autocompletado de contraseñas directamente desde el gestor.

---

### Conclusión

Password Manager es una herramienta integral y segura que responde a la creciente necesidad de gestionar contraseñas y datos sensibles de forma centralizada y eficiente. Con un enfoque en la seguridad, la usabilidad y la escalabilidad, este proyecto tiene el potencial de evolucionar para incluir funcionalidades más avanzadas que mejoren la experiencia del usuario y amplíen sus capacidades.

**¿Cuándo Usar Cada Uno?**

**1. Usa Microsoft.AspNetCore.Authentication.Cookies si:**
Quieres un control total sobre la autenticación.
Tienes un sistema propio de gestión de usuarios.
Tu aplicación es sencilla y no necesita roles ni registro de usuarios.

**2. Usa ASP.NET Core Identity si:**
Necesitas un sistema completo y listo para usar.
Deseas soporte para roles, claims, recuperación de contraseñas, etc.
Planeas integrar proveedores de autenticación externa.

---
# Vista Previa del Proyecto

1. Preview
![preview](/Preview/preview.gif)

