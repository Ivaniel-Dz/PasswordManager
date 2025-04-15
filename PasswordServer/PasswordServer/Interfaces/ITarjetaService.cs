using PasswordServer.DTO;
using PasswordServer.Models;

namespace PasswordServer.Interfaces
{
    public interface ITarjetaService
    {
        Task<IEnumerable<TarjetaDto>> GetAllAsync(int userId, string? term);
        Task<TarjetaDto?> GetByIdAsync(int id, int userId);
        Task<object> CreateAsync(TarjetaDto tarjetaDto, int userId);
        Task<object> UpdateAsync(TarjetaDto tarjetaDto, int userId);
        Task<bool> DeleteAsync(int id, int userId);
    }
}
