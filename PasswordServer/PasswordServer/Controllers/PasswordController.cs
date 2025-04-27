using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Utils;

namespace PasswordServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordService _passwordService;

        public PasswordController(IPasswordService passwordServic)
        {
            _passwordService = passwordServic;
        }

        
        [HttpGet]
        [Route("GetAll")] // api/Password/GetAll
        public  async Task<IActionResult> GetAll([FromQuery] string? term)
        {
            // Obtenemos el userId del token JWT
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var password = await _passwordService.GetAll(userId.Value, term);

            return Ok(password);
        }

        
        [HttpGet]
        [Route("Get/{id}")] // api/Password/Get/id
        public async Task<IActionResult> Get(int id)
        {
            // Obtenemos el userId del token JWT
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var password = await _passwordService.Get(id, userId.Value);
            if (password == null)
            {
                return NotFound(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Password no encontrado"
                });
            }

            return Ok(password);
        }

        
        [HttpPost]
        [Route("Add")] // api/Password/Add
        public async Task<IActionResult> Add([FromBody] PasswordDto passwordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ResponseDto { IsSuccess = false, Message = "Datos inválidos." });

            // Obtenemos el userId del token JWT
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) 
                return Unauthorized(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Usuario no identificado."
                });

            var result = await _passwordService.Add(passwordDto, userId.Value);

            return result .IsSuccess ? Ok(result) : BadRequest(result);
        }

     
        [HttpPut]
        [Route("Update/{id}")] // api/Password/Update/id
        public async Task<IActionResult> Update(int id, [FromBody] PasswordDto passwordDto)
        {
            if(passwordDto == null)
                return BadRequest(new ResponseDto { IsSuccess = false, Message = "Datos Invalidos." });

            // Obtenemos el userId del token JWT
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null)
                return Unauthorized(new ResponseDto { IsSuccess = false, Message = "Usuario no autorizado."});

            var updated = await _passwordService.Update(id, userId.Value, passwordDto);

            if (!updated.IsSuccess) return BadRequest(updated);

            return Ok(updated);
        }

        
        [HttpDelete]
        [Route("Delete/{id}")] // api/Password/Update/id
        public async Task<IActionResult> Delete(int id)
        {
            // Obtenemos el userId del token JWT
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var deleted = await _passwordService.Delete(id, userId.Value);

            if (!deleted)
                return NotFound(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Contraseña no encontrada."
                });

            return Ok(new ResponseDto
            {
                IsSuccess = true,
                Message = "Contraseña eliminada correctamente."
            });
        }

    }// Fin de la clase
}// Fin
