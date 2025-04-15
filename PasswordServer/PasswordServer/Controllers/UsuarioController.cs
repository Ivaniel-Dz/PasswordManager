using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using System.Security.Claims;

namespace PasswordServer.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // Obtenemos el id del Usuario Autenticado
        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

        // Metodo para obtener perfil del usuario autenticado
        [HttpGet]
        [Route("Perfil")] // Ruta: api/Usuario/Perfil
        public async Task<IActionResult> GetPerfil()
        {
            var perfil = await _usuarioService.GetPerfilAsync(User);

            if (perfil == null) {
                return NotFound(new { isSuccess = false, Response = "Usuario no encontrado o token inválido." });
            }

            return Ok(new { isSuccess = true, Response = perfil });
        }

        // Metodo para Actualizar perfil
        [HttpPut]
        [Route("Update")] // Ruta: api/Usuario/Update
        public async Task<IActionResult> Update([FromBody] UsuarioDto usuarioDto)
        {
            // Verificar que el ID del token coincide con el ID del DTO
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId) || userId != usuarioDto.Id)
            {
                return Forbid(); // No tiene permisos para actualizar este usuario
            }

            var usuario = await _usuarioService.UpdateAsync(usuarioDto);
            return Ok(usuario);
        }

        // Metodo para Eliminar cuenta de usuario
        [HttpDelete]
        [Route("Delete")] // Ruta: api/Usuario/Delete
        public async Task<IActionResult> Delete(int id)
        {
            var usuario = await _usuarioService.DeleteAsync(id, User);

            // verifica si tiene permisos para Eliminar
            if (!usuario) return Forbid(); // No tiene

            return Ok(new { isSuccess = true, Response = "La cuenta ha sido eliminada exitosamente." });
        }

    } // Fin de la Clase
} // Fin
