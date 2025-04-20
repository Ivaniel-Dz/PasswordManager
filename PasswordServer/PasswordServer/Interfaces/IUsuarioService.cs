using PasswordServer.DTO;
using System.Security.Claims;

namespace PasswordServer.Interfaces
{
    // Declara la interfaz IUsuarioService que define el contrato para el servicio de usuarios
    public interface IUsuarioService
    {
        Task<UsuarioDto?> GetPerfil(ClaimsPrincipal userClaims);

        Task<UsuarioDto?> Update(UsuarioDto usuarioDto, ClaimsPrincipal userClaims);

        Task<bool> Delete(int id, ClaimsPrincipal userClaims);
    }
}
