using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Utils;

namespace PasswordServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TarjetaController : ControllerBase
    {
        //Inyeccion de dependencias
        private readonly ITarjetaService _tarjetaService;

        public TarjetaController(ITarjetaService tarjetaService)
        {
            _tarjetaService = tarjetaService;
        }


        // Metodo para obtener todas las contraseña de un Usuario
        [HttpGet]
        [Route("GetAll")] // Ruta: api/Tarjeta/GetAll
        public async Task<IActionResult> GetAll([FromQuery] string? term)
        {
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var tarjetas = await _tarjetaService.Get(userId.Value, term);

            return Ok(tarjetas);
        }

        // Metodo para obtener los datos de una Tarjeta
        [HttpGet]
        [Route("Get")] // Ruta: api/Tarjeta/Get
        public async Task<IActionResult> Get(int id)
        {
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var tarjeta = await _tarjetaService.GetById(id, userId.Value);
            return Ok(tarjeta);
        }

        // Metodo para crear una nueva tarjeta
        [HttpPost]
        [Route("Add")] // Ruta: api/Tarjeta/Add
        public async Task<IActionResult> Add([FromBody] TarjetaDto tarjetaDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ResponseDto { IsSuccess = false, Message = "Datos inválidos." });

            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null)
                return Unauthorized(new ResponseDto { IsSuccess = false, Message = "Usuario no identificado." });

            var result = await _tarjetaService.Add(tarjetaDto, userId.Value);

            return result.IsSuccess
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpPut]
        [Route("Update")] // Ruta: api/Tarjeta/Update
        public async Task<IActionResult> Update([FromBody] TarjetaDto tarjetaDto)
        {
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var result = await _tarjetaService.Update(tarjetaDto, userId.Value);
            return result.IsSuccess ? Ok(result) : NotFound(result);
        }

        [HttpDelete]
        [Route("Delete/{id}")] // Ruta: api/Tarjeta/Delete/id
        public async Task<IActionResult> Delete(int id)
        {
            var userId = ClaimUtils.GetUserIdFromClaims(User);
            if (userId == null) return Unauthorized();

            var deleted = await _tarjetaService.Delete(id, userId.Value);
            
            if (!deleted)
                return NotFound(new ResponseDto 
                { 
                    IsSuccess = false ,
                    Message = "Tarjeta no encontrada o no autorizada." 
                });

            return Ok(new ResponseDto
            { 
                IsSuccess = true ,
                Message = "Tarjeta eliminada correctamente." 
            });
        }

    } // Fin de la clase
} // Fin 
