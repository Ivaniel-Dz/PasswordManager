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

        // Vista para Editar Password
        // Método para mostrar la vista de edición con los datos existentes
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            // Obtener el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                TempData["Mensaje"] = "Usuario no autenticado.";
                return Unauthorized(); // Redirige si no se encuentra el UserId
            }

            int userId = int.Parse(userIdClaim);

            // Buscar la contraseña en la base de datos usando el id
            var password = await _appDbContext.Passwords
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (password == null)
            {
                TempData["Mensaje"] = "Contraseña no encontrada.";
                return NotFound();
            }

            // Devolver la vista con el modelo de datos
            return View(password);
        }

        // Método para actualizar los datos de la contraseña
        [HttpPost]
        public async Task<IActionResult> Edit(Password model)
        {
            // Asignar el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                TempData["Mensaje"] = "Usuario no autenticado.";
                return Unauthorized();
            }

            int userId = int.Parse(userIdClaim);  // Obtener el UserId del claim

            // Buscar la contraseña en la base de datos usando model.Id
            var password = await _appDbContext.Passwords
                    .FirstOrDefaultAsync(p => p.Id == model.Id && p.UserId == userId);

            if (password == null)
            {
                TempData["Mensaje"] = "Contraseña no encontrada.";
                return NotFound();
            }

            // Actualizar solo si el valor es no nulo o no vacío
            password.UserId = userId;  // Asignar el UserId al modelo
            password.Titulo = !string.IsNullOrEmpty(model.Titulo) ? model.Titulo : password.Titulo;
            password.UserEmail = !string.IsNullOrEmpty(model.UserEmail) ? model.UserEmail : password.UserEmail;
            password.PasswordHash = !string.IsNullOrEmpty(model.PasswordHash) ? model.PasswordHash : password.PasswordHash;
            password.URL = !string.IsNullOrEmpty(model.URL) ? model.URL : password.URL;
            password.Categoria = !string.IsNullOrEmpty(model.Categoria) ? model.Categoria : password.Categoria;

            // Actualizar la contraseña en la base de datos
            _appDbContext.Passwords.Update(password);

            // Guardar los cambios
            await _appDbContext.SaveChangesAsync();

            // Mensaje de confirmación
            TempData["Mensaje"] = "Contraseña actualizada correctamente!";
            return RedirectToAction(nameof(Index));  // Redirigir a la lista de contraseñas o vista principal
        }

        // Eliminar Password
        [HttpGet]
		public async Task<IActionResult> Delete(int id)
		{
            // Obtener el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                TempData["Mensaje"] = "Usuario no autenticado.";
                return Unauthorized(); // Redirige si no se encuentra el UserId
            }

            int userId = int.Parse(userIdClaim);

            // Busca la contraseña segun el Id
            var password = await _appDbContext.Passwords
				.Include(p => p.User)   // Incluye la relación con User
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

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
