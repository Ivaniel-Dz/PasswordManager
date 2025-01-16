using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Models;
using System.Security.Claims;

namespace PasswordManager.Controllers
{
    [Authorize]
    public class TarjetaController : Controller
    {
        private readonly AppDBContext _appDbContext;

        public TarjetaController(AppDBContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Mostrar la lista de Tarjetas
        [HttpGet]
        public async Task<IActionResult> Index(string? term)
        {
            // Obtener el UserId desde los Claims
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            int userId = int.Parse(userIdClaim);

            var tarjetas = await _appDbContext.Tarjetas
                .Where(t => t.UserId == userId && 
                (string.IsNullOrEmpty(term) ||
                   t.Descripcion.Contains(term) ||
                   t.NombreTitular.Contains(term) ||
                   t.RedTarjeta.Contains(term) ||
                   t.TipoTarjeta.Contains(term)
                ))
                .ToListAsync();

            // Verificar si se encontraron resultados
            if (!tarjetas.Any() && !string.IsNullOrEmpty(term))
            {
                TempData["Mensaje"] = $"No se encontraron resultados para '{term}'.";
            }

            return View(tarjetas);
        }

        // Vista para agregar Datos de Tarjeta
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // Agregar datos de Tarjeta
        [HttpPost]
        public async Task<IActionResult> Create(Tarjeta model)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null) {
                return Unauthorized();
            }

            int userId = int.Parse(userIdClaim);

            var newCard = new Tarjeta
            {
                UserId = userId,
                Numeracion = model.Numeracion,
                FechaExpiracion = model.FechaExpiracion,
                NombreTitular = model.NombreTitular,
                RedTarjeta = model.RedTarjeta,
                TipoTarjeta = model.TipoTarjeta,
                Descripcion = model.Descripcion,
            };

            await _appDbContext.Tarjetas.AddAsync(newCard);
            await _appDbContext.SaveChangesAsync();

            return RedirectToAction("Index", "Tarjeta");
        }

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

            // Buscar los datos en la base de datos usando el id
            var tarjeta = await _appDbContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (tarjeta == null)
            {
                TempData["Mensaje"] = "Dato no encontrado.";
                return NotFound();
            }

            // Devolver la vista con el modelo de datos
            return View(tarjeta);

        }


        // Método para actualizar los datos de la contraseña
        [HttpPost]
        public async Task<IActionResult> Edit(Tarjeta model)
        {
            // Asignar el UserId desde los Claims del usuario autenticado
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                TempData["Mensaje"] = "Usuario no autenticado.";
                return Unauthorized();
            }

            int userId = int.Parse(userIdClaim);  // Obtener el UserId del claim

            // Buscar los datos en la base de datos usando model.Id
            var tarjeta = await _appDbContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == model.Id && t.UserId == userId);

            if (tarjeta == null)
            {
                TempData["Mensaje"] = "Dato no encontrado.";
                return NotFound();
            }

            // Actualizar solo si el valor es no nulo o no vacío
            tarjeta.UserId = userId; // Asignar el UserId al modelo
            tarjeta.Numeracion = model.Numeracion != 0 ? model.Numeracion : tarjeta.Numeracion;
            tarjeta.FechaExpiracion = model.FechaExpiracion != default ? model.FechaExpiracion : tarjeta.FechaExpiracion;
            tarjeta.NombreTitular = !string.IsNullOrEmpty(model.NombreTitular) ? model.NombreTitular : tarjeta.NombreTitular;
            tarjeta.RedTarjeta = !string.IsNullOrEmpty(model.RedTarjeta) ? model.RedTarjeta : tarjeta.RedTarjeta;
            tarjeta.TipoTarjeta = !string.IsNullOrEmpty(model.TipoTarjeta) ? model.TipoTarjeta : tarjeta.TipoTarjeta;
            tarjeta.Descripcion = !string.IsNullOrEmpty(model.Descripcion) ? model.Descripcion : tarjeta.Descripcion;

            // Actualiza los cambios en la Base de datos
            _appDbContext.Tarjetas.Update(tarjeta);
            // Guarda los cambios
            _appDbContext.SaveChanges();

            // Mensaje de confirmación
            TempData["Mensaje"] = "Datos actualizados correctamente!";
            return RedirectToAction(nameof(Index));
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

            // Busca los datos segun el Id
            var tarjeta = await _appDbContext.Tarjetas
                .Include(t => t.User) // Relación Tarjeta con Usuario
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            // Verifica si existe el dato
            if (tarjeta == null)
            {
                TempData["Mensaje"] = "Dato no encontrado.";
                return RedirectToAction(nameof(Index));
            }

            // Elimina solo los datos, no el usuario
            _appDbContext.Tarjetas.Remove(tarjeta);
            await _appDbContext.SaveChangesAsync();

            TempData["Mensaje"] = "Datos eliminado correctamente.";
            return RedirectToAction(nameof(Index));
        }

    }
}
