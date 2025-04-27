using PasswordServer.Models;

namespace PasswordServer.Interfaces
{
    public interface IOptionService
    {
        Task<IEnumerable<CategoriaPassword>> GetCategoria();
        Task<IEnumerable<RedTarjeta>> GetRed();
        Task<IEnumerable<TipoTarjeta>> GetTipo();
    }
}
