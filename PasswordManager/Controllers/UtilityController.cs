using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Models;
using System.Security.Claims;

namespace PasswordManager.Controllers
{
	[Authorize]
	public class UtilityController : Controller
    {
        private readonly AppDBContext _appDbContext;

        public UtilityController(AppDBContext appDbContext) 
        { 
            _appDbContext = appDbContext;
        }

		// Vista de Generador de Contraseña
		public IActionResult PassGenerator()
        {
            return View();
        }

	}
}
