using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Services;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PasswordServer.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        //Inyeccion de dependencias
        private readonly ITarjetaService _tarjetaService;

        public TarjetaController(ITarjetaService tarjetaService)
        {
            _tarjetaService = tarjetaService;
        }

        // Obtenemos el id del Usuario Autenticado
        private int GetUserId() => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

        // Metodo para obtener todas las contraseña de un Usuario
        [HttpGet]
        [Route("GetAll")] // Ruta: api/Tarjeta/GetAll
        public async Task<IActionResult> GetAll(string? term)
        {
            var tarjetas = await _tarjetaService.GetAllAsync(GetUserId(), term);
            return Ok(tarjetas);
        }

        // Metodo para obtener los datos de una Tarjeta
        [HttpGet]
        [Route("Get")] // Ruta: api/Tarjeta/Get
        public async Task<IActionResult> Get(int id)
        {
            var tarjeta = await _tarjetaService.GetByIdAsync(id, GetUserId());
            if (tarjeta == null)
                return NotFound(new { Response = "Tarjeta no encontrada." });

            return Ok(tarjeta);
        }

        // Metodo para crear una nueva tarjeta
        [HttpPost]
        [Route("Create")] // Ruta: api/Tarjeta/Create
        public async Task<IActionResult> Create([FromBody] TarjetaDto tarjetaDto)
        {
            var tarjeta = await _tarjetaService.CreateAsync(tarjetaDto, GetUserId());
            return Ok(tarjeta);
        }

        [HttpPut]
        [Route("Update")] // Ruta: api/Tarjeta/Update
        public async Task<IActionResult> Update([FromBody] TarjetaDto tarjetaDto)
        {
            var tarjeta = await _tarjetaService.UpdateAsync(tarjetaDto, GetUserId());
            return Ok(tarjeta);
        }

        [HttpDelete]
        [Route("Delete")] // Ruta: api/Tarjeta/Delete
        public async Task<IActionResult> Delete(int id)
        {
            var tarjeta = await _tarjetaService.DeleteAsync(id, GetUserId());
            
            if (!tarjeta)
                return NotFound(new { Response = "Tarjeta no encontrada o no autorizada." });

            return Ok(new { Response = "Tarjeta eliminada correctamente." });
        }

    } // Fin de la clase
} // Fin 
