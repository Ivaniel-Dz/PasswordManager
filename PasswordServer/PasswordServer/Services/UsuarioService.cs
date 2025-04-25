using Microsoft.AspNetCore.Mvc;
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
        public async Task<UsuarioDto?> GetPerfil( ClaimsPrincipal userClaims)
        {
            var userId = GetUserIdFromClaims(userClaims);
            if (userId == null) return null;

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
        public async Task<UsuarioDto?> Update(UsuarioDto usuarioDto, ClaimsPrincipal userClaims)
        {

            var userId = GetUserIdFromClaims(userClaims);
            if (userId == null || userId != usuarioDto.Id) return null;

            var usuario = await _appDBContext.Usuarios.FindAsync(userId);
            if (usuario == null) return null;

            // Verificar si el correo ya está en uso por otro usuario
            if (await _appDBContext.Usuarios.AnyAsync(u => u.Correo == usuarioDto.Correo && u.Id != usuarioDto.Id))
            {
                throw new Exception("El correo ya está en uso por otro usuario.");
            }

            // Actualizar nombre y correo si no están vacíos
            usuario.Nombre = string.IsNullOrWhiteSpace(usuarioDto.Nombre) ? usuario.Nombre : usuarioDto.Nombre;
            usuario.Correo = string.IsNullOrWhiteSpace(usuarioDto.Correo) ? usuario.Correo : usuarioDto.Correo;

            // Actualizar contraseña SOLO si se proporcionó una nueva
            if (!string.IsNullOrWhiteSpace(usuarioDto.Clave))
            {
                usuario.Clave = _jwtService.PasswordEncoder(usuarioDto.Clave);
            }

            // Guardar cambios en la base de datos
            _appDBContext.Usuarios.Update(usuario);
            await _appDBContext.SaveChangesAsync();

            return new UsuarioDto { Id = usuario.Id, Nombre = usuario.Nombre, Correo = usuario.Correo };
        }


        // Servicio para eliminar cuenta del usuario
        public async Task<bool> Delete(int id, ClaimsPrincipal userClaims)
        {
            // Obtengo el id del Usuario Auth
            var claimId = GetUserIdFromClaims(userClaims);
            // Compara el id del auth con el id del usuario
            if (claimId == null || claimId != id)
                return false;

            var usuario = await _appDBContext.Usuarios.SingleOrDefaultAsync(u => u.Id == id);
            if (usuario == null)
                return false;

            _appDBContext.Usuarios.Remove(usuario);
            await _appDBContext.SaveChangesAsync();
            return true;
        }

        //Borrar y usar el static class
        private int? GetUserIdFromClaims(ClaimsPrincipal claims)
        {
            var claim = claims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : null;
        }

    } // Fin de la clase
} // Fin
