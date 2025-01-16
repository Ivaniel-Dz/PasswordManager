**Documentaci�n del Proyecto: Password Manager**

---

### 1. Objetivo del Proyecto
El objetivo principal de este proyecto es desarrollar un gestor de contrase�as seguro y eficiente que permita a los usuarios almacenar, generar y gestionar sus contrase�as de manera protegida. Adem�s, el sistema est� dise�ado para proporcionar funcionalidades adicionales, como el almacenamiento de tarjetas (cr�dito, d�bito o prepago) y un sistema de b�squeda avanzado que facilita el filtrado de los datos almacenados.

El gestor est� pensado para mejorar la seguridad digital de los usuarios al centralizar y proteger informaci�n sensible en un entorno seguro, eliminando la necesidad de recordar m�ltiples contrase�as o datos de tarjetas.

---

### 2. Tecnolog�as Utilizadas

#### **Framework**
- **ASP.NET Core MVC**: Framework principal utilizado para desarrollar la aplicaci�n web. Ofrece un entorno modular y escalable para construir aplicaciones web seguras y de alto rendimiento.

#### **Lenguajes de Programaci�n**
- **C#**: Lenguaje principal para el desarrollo del backend y la l�gica de negocio.
- **HTML5**: Lenguaje de marcado para la estructura de las vistas y componentes.
- **CSS3**: Para el dise�o y estilizado de la interfaz de usuario.
- **JavaScript**: Utilizado para agregar interactividad y funcionalidades din�micas en el frontend.

#### **Base de Datos**
- **SQL Server**: Sistema de gesti�n de bases de datos relacional utilizado para almacenar informaci�n de usuarios, contrase�as y tarjetas de manera segura. La base de datos se encuentra dise�ada con relaciones y restricciones que garantizan la integridad de los datos.

#### **Librer�as y Herramientas Adicionales**
- **Entity Framework Core**: ORM utilizado para interactuar con la base de datos de forma eficiente y sin necesidad de escribir consultas SQL manualmente.
- **Microsoft Identity**: Implementado para la autenticaci�n y gesti�n de usuarios.
- **Bootstrap**: Framework de CSS utilizado para garantizar un dise�o responsivo y amigable para el usuario.
- **SHA256**: Algoritmo de hash utilizado para cifrar las contrase�as antes de almacenarlas en la base de datos.
- **AES**: Algoritmo de cifrado utilizado para proteger datos sensibles como contrase�as y tarjetas de cr�dito.

---

### 3. Funcionalidades Principales

1. **Almacenamiento Seguro**:
   - Permite a los usuarios guardar contrase�as asociadas a diferentes cuentas o servicios.
   - Posibilidad de almacenar informaci�n adicional como datos de tarjetas (cr�dito, d�bito o prepago).

2. **Generador de Contrase�as**:
   - Genera contrase�as seguras y personalizables con diferentes opciones como longitud, uso de caracteres especiales, n�meros, letras may�sculas y min�sculas.
   - Incluye la opci�n de agregar palabras clave adicionales para facilitar el recuerdo de contrase�as complejas.

3. **B�squeda y Filtrado**:
   - Los usuarios pueden buscar r�pidamente contrase�as o datos almacenados mediante un sistema de filtrado eficiente.

4. **Autenticaci�n Segura**:
   - Sistema de autenticaci�n basado en cookies y con hashing de contrase�as para garantizar la protecci�n de las credenciales de los usuarios.

5. **Interfaz Intuitiva**:
   - Dise�o moderno y responsivo que facilita la navegaci�n y la experiencia del usuario.

6. **Cierre de Sesi�n Seguro**:
   - Proporciona una funcionalidad para que los usuarios cierren sesi�n de manera segura, eliminando cualquier token de autenticaci�n activo.

---

### 4. Arquitectura del Sistema
El proyecto sigue una arquitectura basada en el patr�n **MVC (Model-View-Controller)**:

- **Model**: Representa las entidades de datos como usuarios, contrase�as y tarjetas, y define la estructura de la base de datos.
- **View**: Define las vistas de usuario, incluyendo formularios, listas y dise�os responsivos.
- **Controller**: Contiene la l�gica de negocio y sirve como intermediario entre las vistas y los modelos.

Adem�s, se implementa una separaci�n clara de responsabilidades mediante el uso de servicios dedicados para tareas como hashing de contrase�as y cifrado de datos.

---

### 5. Seguridad

El proyecto pone �nfasis en la seguridad mediante las siguientes medidas:

- **Cifrado de Contrase�as**:
  - Las contrase�as se almacenan como hashes utilizando SHA256, lo que asegura que no se puedan revertir a texto plano.

- **Cifrado de Datos Sensibles**:
  - Datos como contrase�as y tarjetas se cifran utilizando AES antes de ser almacenados.

- **Autenticaci�n**:
  - Se utiliza autenticaci�n basada en cookies con tokens seguros para mantener las sesiones activas.

- **Validaci�n de Entradas**:
  - Todas las entradas del usuario se validan para evitar ataques como inyecciones SQL o XSS.

---

### 6. Cambios a Futuro

1. **Recuperaci�n de Contrase�a**:
   - Implementar un sistema de recuperaci�n de contrase�a para usuarios que olviden sus credenciales.
   - Enviar enlaces seguros por correo electr�nico para restablecer la contrase�a.

2. **Numeraci�n de Pie de P�ginas**:
   - Agregar numeraci�n autom�tica en las vistas de listas largas para facilitar la navegaci�n.

3. **Soporte Multiusuario**:
   - Permitir que un usuario pueda compartir contrase�as de forma segura con otros usuarios registrados.

4. **Autenticaci�n Multifactor (MFA)**:
   - Mejorar la seguridad implementando autenticaci�n de dos factores (2FA) mediante aplicaciones como Google Authenticator o SMS.

5. **Historial de Contrase�as**:
   - Implementar un sistema que registre los cambios realizados en las contrase�as y permita restaurar versiones anteriores.

6. **Soporte para M�ltiples Idiomas**:
   - Internacionalizar la aplicaci�n para que pueda ser utilizada por usuarios de diferentes pa�ses.

7. **Integraci�n con Navegadores**:
   - Desarrollar extensiones para navegadores que permitan el autocompletado de contrase�as directamente desde el gestor.

---

### Conclusi�n

Password Manager es una herramienta integral y segura que responde a la creciente necesidad de gestionar contrase�as y datos sensibles de forma centralizada y eficiente. Con un enfoque en la seguridad, la usabilidad y la escalabilidad, este proyecto tiene el potencial de evolucionar para incluir funcionalidades m�s avanzadas que mejoren la experiencia del usuario y ampl�en sus capacidades.

**�Cu�ndo Usar Cada Uno?**

**1. Usa Microsoft.AspNetCore.Authentication.Cookies si:**
Quieres un control total sobre la autenticaci�n.
Tienes un sistema propio de gesti�n de usuarios.
Tu aplicaci�n es sencilla y no necesita roles ni registro de usuarios.

**2. Usa ASP.NET Core Identity si:**
Necesitas un sistema completo y listo para usar.
Deseas soporte para roles, claims, recuperaci�n de contrase�as, etc.
Planeas integrar proveedores de autenticaci�n externa.

---
# Vista Previa del Proyecto

1. Preview
![preview](/Preview/preview.gif)

