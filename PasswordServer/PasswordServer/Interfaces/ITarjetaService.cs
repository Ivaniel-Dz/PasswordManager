using PasswordServer.DTO;

namespace PasswordServer.Interfaces
{
    public interface ITarjetaService
    {
        Task<IEnumerable<TarjetaDto>> GetAll(int userId, string? term);
        Task<TarjetaDto?> Get(int id, int userId);
        Task<ResponseDto> Add(TarjetaDto tarjetaDto, int userId);
        Task<ResponseDto> Update(TarjetaDto tarjetaDto, int userId);
        Task<bool> Delete(int id, int userId);
    }
}
