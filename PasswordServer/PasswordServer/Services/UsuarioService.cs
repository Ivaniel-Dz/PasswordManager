using Microsoft.EntityFrameworkCore;
using PasswordServer.Data;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Jwt;
using System.Security.Claims;

namespace PasswordServer.Services
{
    public class UsuarioService : IUsuarioService
    {
        // Inyención de dependencia
        private readonly AppDBContext _appDBContext;
        private readonly JwtService _jwtService;

        public UsuarioService(AppDBContext appDBContext, JwtService jwtService)
        {
            _appDBContext = appDBContext;
            _jwtService = jwtService;
        }

        // Servicio para mostrar los datos del Perfil del Usuario
        public async Task<UsuarioDto?> GetPerfilAsync(ClaimsPrincipal userClaims)
        {
            var userIdClaim = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdClaim, out int userId)) return null;

            var usuario = await _appDBContext.Usuarios
                .Where(u => u.Id == userId)
                .Select(u => new UsuarioDto
                {
                    Id = u.Id,
                    Nombre = u.Nombre,
                    Correo = u.Correo
                })
                .FirstOrDefaultAsync();

            return usuario;
        }

        // Servicio para Actualizar información del usuario
        public async Task<object> UpdateAsync(UsuarioDto usuarioDto)
        {
            // Buscar al usuario autenticado por su ID
            var existsUser = await _appDBContext.Usuarios.FindAsync(usuarioDto.Id);
            if (existsUser == null)
            {
                return new { isSuccess = false, Response = "El usuario no fue encontrado." };
            }

            // Verificar si el correo ya está en uso por otro usuario
            if (await _appDBContext.Usuarios.AnyAsync(u => u.Correo == usuarioDto.Correo && u.Id != usuarioDto.Id))
            {
                return new { isSuccess = false, Response = "El correo ya está en uso por otro usuario." };
            }

            // Actualizar nombre y correo si no están vacíos
            existsUser.Nombre = string.IsNullOrWhiteSpace(usuarioDto.Nombre) ? existsUser.Nombre : usuarioDto.Nombre;
            existsUser.Correo = string.IsNullOrWhiteSpace(usuarioDto.Correo) ? existsUser.Correo : usuarioDto.Correo;

            // Actualizar contraseña SOLO si se proporcionó una nueva
            if (!string.IsNullOrWhiteSpace(usuarioDto.Clave))
            {
                existsUser.Clave = _jwtService.PasswordEncoder(usuarioDto.Clave);
            }

            // Guardar cambios en la base de datos
            _appDBContext.Usuarios.Update(existsUser);
            await _appDBContext.SaveChangesAsync();

            return new { isSuccess = true, Response = "Usuario actualizado exitosamente." };
        }


        // Servicio para eliminar cuenta del usuario
        public async Task<bool> DeleteAsync(int id, ClaimsPrincipal userClaims)
        {
            var userIdClaim = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdClaim, out int currentUserId) || id != currentUserId)
                return false;

            var usuario = await _appDBContext.Usuarios.FindAsync(id);
            if (usuario == null) return false;

            _appDBContext.Usuarios.Remove(usuario);
            await _appDBContext.SaveChangesAsync();
            return true;
        }

    } // Fin de la clase
} // Fin
