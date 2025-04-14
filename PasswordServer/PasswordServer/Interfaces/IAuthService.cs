using PasswordServer.DTO;

namespace PasswordServer.Interfaces
{
    public interface IAuthService
    {
        Task<object> RegistroAsync(RegistroDto registro);
        Task<object> LoginAsync(LoginDto login);
        bool ValidarToken(string token);
    }
}
