using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        // Metodo para obtener perfil del usuario autenticado
        [HttpGet]
        [Route("Perfil")] // Ruta: api/Usuario/Perfil
        public async Task<IActionResult> GetPerfil()
        {
            var perfil = await _usuarioService.GetPerfil(User);

            if (perfil == null) {
                return NotFound( new ResponseDto { IsSuccess = false, Message = "Usuario no encontrado." });
            }

            return Ok( new { IsSuccess = true, Response = perfil });
        }

        // Metodo para Actualizar perfil
        [HttpPut]
        [Route("Update")] // Ruta: api/Usuario/Update
        public async Task<IActionResult> Update([FromBody] UsuarioDto usuarioDto)
        {
            var updated = await _usuarioService.Update(usuarioDto, User);
            if (updated != null) 
                return BadRequest( new ResponseDto { IsSuccess = false, Message = "No se pudo actualizar el usuario." });

            return Ok(new { IsSuccess = true, Response = updated });
        }

        // Metodo para Eliminar cuenta de usuario
        [HttpDelete]
        [Route("Delete")] // Ruta: api/Usuario/Delete
        public async Task<IActionResult> Delete([FromBody] UsuarioDto usuarioDto)
        {
            var deleted = await _usuarioService.Delete(usuarioDto, User);
            // verifica si tiene permisos para Eliminar
            if (!deleted) return Forbid(); // No tiene

            return Ok(new ResponseDto { IsSuccess = true, Message = "La cuenta ha sido eliminada exitosamente." });
        }

    } // Fin de la Clase
} // Fin
