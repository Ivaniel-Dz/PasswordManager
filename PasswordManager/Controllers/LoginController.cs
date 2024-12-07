using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Services;
using PasswordManager.ViewModels;
using System.Security.Claims;

namespace PasswordManager.Controllers
{
    public class LoginController : Controller
    {
        // Contexto de BBDD para interatuar con las tablas
        private readonly AppDBContext _appDbContext;
        private readonly PassHasher _passHasher;

        public LoginController(AppDBContext appDbContext, PassHasher passHasher)
        {
            // Asigna el contexto recibido a la variable local
            _appDbContext = appDbContext;
            _passHasher = passHasher;
        }
        
        // Vista de Login/Register
        [HttpGet]
        public IActionResult Index()
        {
            // Si el usuario ya está autenticado, redirige a la página principal.
            if (User.Identity!.IsAuthenticated) return RedirectToAction("Index", "Password");

            return View();
        }


        // Metodo para Ingresar a la cuenta
        [HttpPost]
        public async Task<IActionResult> Index(Login modelView)
        {
            if (ModelState.IsValid)
            {
                // Busca en la base de datos un usuario que coincida con el correo y la clave.
                var userFound = await _appDbContext.Users
                                .Where(u => 
                                    u.Correo == modelView.Correo &&
                                    u.ClaveHash == _passHasher.EncryptPass(modelView.ClaveHash)
                               ).FirstOrDefaultAsync();

                // Condicion para el proceso de no encontro usuario
                if (userFound == null) {
                    TempData["Mensaje"] = "Contraseña o Correo Incorrecto.";
                    return RedirectToAction("Index"); // Retorna la vista con el mensaje de error.
                }

                // Crea una lista de reclamaciones (claims) que representan la identidad del usuario.
                List<Claim> claims = new List<Claim>()
                {
                    // Agrega una reclamacines que incluye:
                    new Claim(ClaimTypes.NameIdentifier, userFound.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFound.Nombre),
                    new Claim(ClaimTypes.Email, userFound.Correo),
                };

                // Crea una identidad basada en las reclamaciones usando autenticación de cookies.
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                // Define las propiedades de la autenticación.
                AuthenticationProperties properties = new AuthenticationProperties()
                {
                    // Permite que la sesión pueda ser refrescada.
                    AllowRefresh = true,
                };

                // Inicia la sesión del usuario de forma asíncrona.
                await HttpContext.SignInAsync(
                    // Especifica el esquema de autenticación basado en cookies.
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    // Asigna la identidad de reclamaciones al usuario.
                    new ClaimsPrincipal(claimsIdentity),
                    // Aplica las propiedades de autenticación definidas.
                    properties
                );

                return RedirectToAction("Index", "Password");
            }
                // Si no coincide ningún rol, redirigir a una página por defecto.
                return RedirectToAction("Privacy", "Home");
        }


        // Acción que cierra la sesión del usuario.
        public async Task<IActionResult> Exit()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            //                      View    Controlador  
            return RedirectToAction("Index", "Login");
        }
    }
}
