using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordServer.Interfaces;
using PasswordServer.Models;

namespace PasswordServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OptionController : ControllerBase
    {
        private readonly IOptionService _optionService;

        public OptionController(IOptionService optionService)
        {
            _optionService = optionService;
        }

        // GET: api/Option/GetCategoria
        [HttpGet]
        [Route("GetCategoria")]
        public async Task<ActionResult<IEnumerable<CategoriaPassword>>> GetCategoria()
        {
            return Ok(await _optionService.GetCategoria());
        }

        // GET: api/Option/GetCategoria
        [HttpGet]
        [Route("GetRed")]
        public async Task<ActionResult<IEnumerable<RedTarjeta>>> GetRed()
        {
            return Ok(await _optionService.GetRed());
        }

        // GET: api/Option/GetTipo
        [HttpGet]
        [Route("GetTipo")]
        public async Task<ActionResult<IEnumerable<TipoTarjeta>>> GetTipo()
        {
            return Ok(await _optionService.GetTipo());
        }

    }
}
