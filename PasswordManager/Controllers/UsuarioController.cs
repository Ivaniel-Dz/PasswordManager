using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Models;
using PasswordManager.Services;
using PasswordManager.ViewModels;

namespace PasswordManager.Controllers
{
    public class UsuarioController : Controller
    {
        // Contexto de BBDD para interatuar con las tablas
        private readonly AppDBContext _appDbContext;
        private readonly PassHasher _passHasher;

        public UsuarioController(AppDBContext appDbContext, PassHasher passHasher)
        {
            // Asigna el contexto recibido a la variable local
            _appDbContext = appDbContext;
            _passHasher = passHasher;
        }

        // Método para la Vista de Registrar Usuario
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // Método de Registro de Usurio
        [HttpPost]
        public async Task<IActionResult> Create(Usuario modelView)
        {
            if (ModelState.IsValid)
            {

                if (modelView.Clave != modelView.ConfirClave)
                {
                    TempData["Mensaje"] = "Las Contraseña no coinciden."; // Muestra un mensaje de error
                    return RedirectToAction("Create"); // Retorna la vista con el mensaje de error.
                }

                // Verificación si el correo ya está registrado
                var existingUser = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Correo == modelView.Correo);
                if (existingUser != null)
                {
                    TempData["Mensaje"] = "Ya existe un usuario con este correo."; // Muestra un mensaje de error
                    return RedirectToAction("Create"); // Retorna la vista con el mensaje de error.
                }

                // Crea un nuevo objeto de usuario basado en el modelo de vista recibido.
                var user = new User()
                {
                    Nombre = modelView.Nombre,
                    Correo = modelView.Correo,
                    ClaveHash = _passHasher.EncryptPass(modelView.Clave),
                };

                //Agrega y Guarda nuevo usauario a la BBDD
                await _appDbContext.Users.AddAsync(user);
                await _appDbContext.SaveChangesAsync();

                if (user.Id != 0)
                {
                    return RedirectToAction("Index", "Login");
                }
            }

            TempData["Mensaje"] = "No se creo el usuario."; // Muestra un mensaje de error
            return RedirectToAction("Create"); // Retorna la vista con el mensaje de error.
        }


        // Método para cargar la vista de Editar
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var user = await _appDbContext.Users.FindAsync(id);
            if (user == null)
            {
                TempData["Mensaje"] = "Usuario no encontrado.";
                return RedirectToAction("Index", "Password");
            }

            // Crea un modelo de vista para llenar los campos de edición
            var modelView = new Usuario
            {
                Id = user.Id,
                Nombre = user.Nombre,
                Correo = user.Correo
            };

            // Retorna la vista con el modelo cargado
            return View(modelView);
        }

        // Método para actualizar los datos del usuario
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Edit(Usuario modelView)
        {
            // Buscar al usuario existente por su ID
            var existingUser = await _appDbContext.Users.FindAsync(modelView.Id);
            if (existingUser == null)
            {
                TempData["Mensaje"] = "El usuario no fue encontrado.";
                return RedirectToAction(nameof(Index), "Password");
            }

            // Verificar si el correo ya está en uso por otro usuario
            if (await _appDbContext.Users.AnyAsync(u => u.Correo == modelView.Correo && u.Id != modelView.Id))
            {
                TempData["Mensaje"] = "El correo ya está en uso por otro usuario.";
                return RedirectToAction(nameof(Edit), new { id = modelView.Id });
            }

            // Actualizar nombre y correo si no están vacíos
            existingUser.Nombre = string.IsNullOrWhiteSpace(modelView.Nombre) ? existingUser.Nombre : modelView.Nombre;
            existingUser.Correo = string.IsNullOrWhiteSpace(modelView.Correo) ? existingUser.Correo : modelView.Correo;

            // Actualizar contraseña solo si se proporciona una nueva
            if (!string.IsNullOrWhiteSpace(modelView.Clave))
            {
                if (modelView.Clave != modelView.ConfirClave)
                {
                    TempData["Mensaje"] = "Las contraseñas no coinciden.";
                    return RedirectToAction(nameof(Edit), new { id = modelView.Id });
                }
                existingUser.ClaveHash = _passHasher.EncryptPass(modelView.Clave);
            }

            // Guardar cambios en la base de datos
            _appDbContext.Users.Update(existingUser);
            await _appDbContext.SaveChangesAsync();

            TempData["Mensaje"] = "Usuario actualizado exitosamente.";
            return RedirectToAction(nameof(Index), "Password");
        }
    }
}
