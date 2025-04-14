using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordServer.DTO;
using PasswordServer.Interfaces;


namespace PasswordServer.Controllers
{
    [Route("api/[controller]")] // Definir la ruta base para el controlador (e.g. api/auth)
    [AllowAnonymous] // Permitir acceso a este controlador sin autenticación
    [ApiController] // Indica que este controlador manejará respuestas JSON automáticamente
    public class AuthController : ControllerBase
    {
        // Inyeccion de dependecias
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // Endpoint para registrar un nuevo usuario
        [HttpPost]
        [Route("Registro")] // Ruta: api/Auth/Registro
        public async Task<IActionResult> Registro([FromBody] RegistroDto registro)
        {
            var result = await _authService.RegistroAsync(registro);
            return Ok(result);
        }

        // Endpoint para el login del usuario
        [HttpPost]
        [Route("Login")] // Ruta: api/Auth/Login
        public async Task<IActionResult> Login(LoginDto login)
        {
            var result = await _authService.LoginAsync(login);
            return Ok(result);
        }

        // Endpoint para probar la validación
        [HttpGet]
        [Route("validarToken")] // Ruta: api/Auth/validarToken
        [Authorize]
        public IActionResult ValidarToken([FromQuery] string token)
        {
            var result = _authService.ValidarToken(token);
            return Ok(new { isSuccess = result });
        }

    }
}
