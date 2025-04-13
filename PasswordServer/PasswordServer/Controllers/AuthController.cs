using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordServer.Data;
using PasswordServer.Jwt;
using PasswordServer.DTO;
using PasswordServer.Models;
using Microsoft.EntityFrameworkCore;


namespace PasswordServer.Controllers
{
    [Route("api/[controller]")] // Definir la ruta base para el controlador (e.g. api/auth)
    [AllowAnonymous] // Permitir acceso a este controlador sin autenticación
    [ApiController] // Indica que este controlador manejará respuestas JSON automáticamente
    public class AuthController : ControllerBase
    {
        // Inyeccion de dependecias
        private readonly AppDBContext _appDBContext;
        private readonly JwtService _jwtService;

        public AuthController(AppDBContext appDBContext, JwtService jwtService)
        {
            _appDBContext = appDBContext;
            _jwtService = jwtService;
        }

        // Endpoint para registrar un nuevo usuario
        [HttpPost]
        [Route("Registro")] // Ruta: api/Auth/Registro
        public async Task<IActionResult> Registro(RegistroDto registro)
        {
            // Verifica si la contraseña coinciden 
            if (registro.Clave != registro.ConfirClave)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, Response = "Las contraseñas no coinciden." });
            }

            // Verificación si el correo ya está registrado
            var existsEmail = await _appDBContext.Usuarios.FirstOrDefaultAsync(u => u.Correo == registro.Correo);
            if (existsEmail != null) {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, Response = "Ya existe un usuario con este correo." });
            }

            // Crear un nuevo modelo de usuario a partir de los datos recibidos
            var usuario = new Usuario
            {
                Nombre = registro.Nombre,
                Correo = registro.Correo,
                Clave = _jwtService.PasswordEncoder(registro.Clave),
            };

            // Agregar el nuevo usuario a la base de datos
            await _appDBContext.Usuarios.AddAsync(usuario);
            await _appDBContext.SaveChangesAsync(); // Guardar cambios en la base de datos

            // Verificar si el usuario se registró correctamente
            if (usuario.Id != 0)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true }); // Éxito
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false }); // Error
            }
        }

        // Endpoint para el login del usuario
        [HttpPost]
        [Route("Login")] // Ruta: api/Auth/Login
        public async Task<IActionResult> Login(LoginDto login)
        {
            // Buscar al usuario por correo y clave encriptada
            var findByUser = await _appDBContext.Usuarios
                             .Where(u =>
                                u.Correo == login.Correo && // Verificar si el correo coincide
                                u.Clave == _jwtService.PasswordEncoder(login.Clave) // Comparar la clave encriptada
                             ).FirstOrDefaultAsync();

            // Si el usuario no es encontrado, retornar error
            if (findByUser == null)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" }); // Usuario no encontrado
            }
            else
            {
                // Usuario encontrado, retornar éxito (token vacío por ahora)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _jwtService.GenerarJWT(findByUser) });
            }
        }

        // Endpoint para probar la validación
        [HttpGet]
        [Route("validarToken")] // Ruta: api/Auth/validarToken
        [Authorize]
        public IActionResult ValidarToken([FromQuery] string token)
        {
            bool respuesta = _jwtService.ValidarToken(token);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta }); // Usuario no encontrado
        }

    }
}
