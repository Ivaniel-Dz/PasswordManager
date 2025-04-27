using Microsoft.EntityFrameworkCore;
using PasswordServer.Data;
using PasswordServer.Interfaces;
using PasswordServer.Models;

namespace PasswordServer.Services
{
    public class OptionService : IOptionService
    {
        private readonly AppDBContext _appDBContext;

        public OptionService(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }

        public async Task<IEnumerable<CategoriaPassword>> GetCategoria()
        {
            return await _appDBContext.CategoriasPass.ToListAsync();
        }

        public async Task<IEnumerable<RedTarjeta>> GetRed()
        {
            return await _appDBContext.RedTarjetas.ToListAsync();
        }

        public async Task<IEnumerable<TipoTarjeta>> GetTipo()
        {
            return await _appDBContext.TipoTarjetas.ToListAsync();
        }

    }
}
