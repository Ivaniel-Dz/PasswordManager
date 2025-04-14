using PasswordServer.DTO;
using System.Security.Claims;

namespace PasswordServer.Interfaces
{
    // Declara la interfaz IUsuarioService que define el contrato para el servicio de usuarios
    public interface IUsuarioService
    {
        // Retorna un <UsuarioDto> nullable (puede ser null si no se encuentra el usuario)
        Task<UsuarioDto?> GetPerfilAsync(ClaimsPrincipal userClaims);
        // Retorna un <objeto> genérico (podría ser el usuario actualizado o un mensaje de resul
        Task<object> UpdateAsync(UsuarioDto usuarioDto);
        // Retorna un <booleano> indicando si la operación fue exitosa
        Task<bool> DeleteAsync(int id, ClaimsPrincipal userClaims);
    }
}
