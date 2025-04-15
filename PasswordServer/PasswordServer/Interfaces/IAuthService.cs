using PasswordServer.DTO;

namespace PasswordServer.Interfaces
{
    public interface IAuthService
    {
        Task<ResponseDto> Registro(RegistroDto registro);
        Task<ResponseDto> Login(LoginDto login);
        bool ValidarToken(string token);
    }
}
