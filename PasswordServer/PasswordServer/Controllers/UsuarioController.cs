using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Models;

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
        [Route("Perfil")] // api/Usuario/Perfil
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
        [Route("Update")] // api/Usuario/Update
        public async Task<IActionResult> Update([FromBody] UsuarioDto usuarioDto)
        {
            var updated = await _usuarioService.Update(usuarioDto, User);
            if (updated == null) 
                return BadRequest( new ResponseDto { IsSuccess = false, Message = "No se pudo actualizar el usuario." });

            return Ok(new { IsSuccess = true, Response = updated });
        }

        // Metodo para Eliminar cuenta de usuario
        [HttpDelete]
        [Route("Delete/{id}")] // api/Usuario/Delete/id
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _usuarioService.Delete(id, User);

            if (!deleted)
            {
                return NotFound(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Usuario no encontrado o no tienes permisos para eliminarlo"
                });
            }

            return Ok(new ResponseDto
            {
                IsSuccess = true,
                Message = "La cuenta ha sido eliminada exitosamente."
            });
        }


    } // Fin de la Clase
} // Fin
