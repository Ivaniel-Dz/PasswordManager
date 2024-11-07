using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Models;
using PasswordManager.Services;
using System.Security.Claims;

namespace PasswordManager.Controllers
{
    [Authorize]
    public class PasswordController : Controller
    {
        private readonly AppDBContext _appDbContext;
		private readonly PassEncryptor _passEncryptor;

		public PasswordController(AppDBContext appDbContext, PassEncryptor passEncryptor)
        {
            _appDbContext = appDbContext;
			_passEncryptor = passEncryptor;
		}

        // Mostrar la Lista de Password segun el Usuario
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            // Obtener el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized(); // Redirige si no se encuentra el UserId
            }

            int userId = int.Parse(userIdClaim);

            // Filtrar las contraseñas por UserId
            List<Password> lista = await _appDbContext.Passwords
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return View(lista);
        }


        // Muestra un Password seleccionada
        [HttpGet]
		public async Task<IActionResult> Detalle(int id)
		{
            // Obtener el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized(); // Redirige si no se encuentra el UserId
            }

            int userId = int.Parse(userIdClaim);

            var password = await _appDbContext.Passwords
				.FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            // Verificar si se encontró la contraseña
            if (password == null)
            {
                TempData["Mensaje"] = "Contraseña no encontrada o no tienes permiso para verla.";
                return NotFound();
            }

            // Desencripta la contraseña antes de mostrarla
            password.PasswordHash = _passEncryptor.Decrypt(password.PasswordHash);

            // Devuelve una vista parcial con los detalles de la contraseña
            return PartialView("Detalle", password);
		}

        // Muestra Password por Categoria
        [HttpGet]
		public async Task<IActionResult> Categoria(string categoria)
		{
            // Obtener el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized(); // Redirige si no se encuentra el UserId
            }

            int userId = int.Parse(userIdClaim);

            // Filtrar las contraseñas por UserId
            List<Password> lista = await _appDbContext.Passwords
                .Where(p => p.UserId == userId && p.Categoria == categoria)
                .ToListAsync();

            return View(lista);
        }

        // Vista para Agregar Password Nuevo
        [HttpGet]
		public IActionResult Create()
		{
			return View();
		}

        // Agregar Nuevo Password
        [HttpPost]
        public async Task<IActionResult> Create(Password model)
        {
            // Obtener el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized(); // Redirige si no se encuentra el UserId
            }

            int userId = int.Parse(userIdClaim);

            var newPassword = new Password
            {
                UserId = userId,
                Titulo = model.Titulo,
                UserEmail = model.UserEmail,
                PasswordHash = _passEncryptor.Encrypt(model.PasswordHash),
                URL = model.URL,
                Categoria = model.Categoria
            };

            await _appDbContext.Passwords.AddAsync(newPassword);
            await _appDbContext.SaveChangesAsync();

            return RedirectToAction("Index", "Password");
        }

        // Vista para Actualizar Password

        // Actualizar Password

        // Eliminar Password
        [HttpGet]
		public async Task<IActionResult> Delete(int id)
		{
			// Busca la contraseña segun el Id
			var password = await _appDbContext.Passwords
				.Include(p => p.User)   // Incluye la relación con User
                .FirstOrDefaultAsync(p => p.Id == id);

			// Verifica si existe la contraseña
			if(password == null)
			{
                TempData["Mensaje"] = "Contraseña no encontrado.";
                return RedirectToAction(nameof(Index));
            }
            // Elimina solo la contraseña, no el usuario
            _appDbContext.Passwords.Remove(password);
			await _appDbContext.SaveChangesAsync();

            TempData["Mensaje"] = "Contraseña eliminado correctamente.";
            return RedirectToAction(nameof(Index));
        }

	}
}
