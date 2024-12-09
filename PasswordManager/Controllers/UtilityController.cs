using Microsoft.AspNetCore.Mvc;

namespace PasswordManager.Controllers
{
    public class UtilityController : Controller
    {
        // Vista de Generador de Contraseña
        public IActionResult PassGenerator()
        {
            return View();
        }
    }
}
