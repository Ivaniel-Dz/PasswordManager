using PasswordServer.DTO;

namespace PasswordServer.Interfaces
{
    public interface IPasswordService
    {
        Task<IEnumerable<PasswordDto>> GetAll(int userId, string? categoria, string? term);
        Task<PasswordDto?> Get(int id, int userId);
        Task<ResponseDto> Add(PasswordDto tarjetaDto, int userId);
        Task<ResponseDto> Update(int id, int userId, PasswordDto passwordDto);
        Task<bool> Delete(int id, int userId);
    }
}
