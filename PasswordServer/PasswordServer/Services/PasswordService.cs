using Microsoft.EntityFrameworkCore;
using PasswordServer.Data;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Models;
using PasswordServer.Utils;

namespace PasswordServer.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly AppDBContext _appDBContext;
        private readonly PassEncryptor _encryptor;

        public PasswordService(AppDBContext appDBContext, PassEncryptor encryptor)
        {
            _appDBContext = appDBContext;
            _encryptor = encryptor;

        }

        // Servicio para Obtener todas las contraseñas por: categoria o busqueda
        public async Task<IEnumerable<PasswordDto>> GetAll(int userId, string? categoria, string? term)
        {
            // Compara si el id y categoria son iguales a lo ingresado
            var query = _appDBContext.Passwords
                .Include(p => p.CategoriaPassword)
                .Where(p => p.UserId == userId);

            // Filtra por categoria
            if (!string.IsNullOrEmpty(categoria))
                query = query.Where(p => p.CategoriaPassword.Nombre == categoria);

            // Filtra por termino
            if (!string.IsNullOrEmpty(term))
                query = query.Where(p =>
                    p.Nombre.Contains(term) ||
                    p.UserEmail.Contains(term) ||
                    p.CategoriaPassword.Nombre.Contains(term) ||
                    p.FechaActualizacion.ToString().Contains(term) ||
                    p.FechaCreacion.ToString().Contains(term)
                );

            // Retorna la lista de datos
            return await query.Select(dto => new PasswordDto
            {
                Id = dto.Id,
                UserId = dto.UserId,
                Nombre = dto.Nombre,
                Url = dto.Url,
                UserEmail = dto.UserEmail,
                Clave = dto.Clave,
                Notas = dto.Notas,
                FechaCreacion = dto.FechaCreacion,
                FechaActualizacion = dto.FechaActualizacion,
                CategoriaId = dto.CategoriaId,
                CategoriaNombre = dto.CategoriaPassword.Nombre,
            }).ToListAsync();
        }


        // Servicio para mostrar una contraseña por id
        public async Task<PasswordDto?> Get(int id, int userId)
        {
            var password = await _appDBContext.Passwords
                .Include(p => p.CategoriaPassword)
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (password == null) return null;

            return new PasswordDto
            {
                Id = password.Id,
                UserId = password.UserId,
                Nombre = password.Nombre,
                Url = password.Url,
                UserEmail = password.UserEmail,
                Clave = _encryptor.Decrypt(password.Clave),
                Notas = password.Notas,
                FechaCreacion = password.FechaCreacion,
                FechaActualizacion = password.FechaActualizacion,
                CategoriaId = password.CategoriaId,
                CategoriaNombre = password.CategoriaPassword.Nombre,
            };
        }


        // Servicio para Agregar
        public async Task<ResponseDto> Add(PasswordDto passwordDto, int userId)
        {
            // Verificar si ya existe una tarjeta con la misma Numeración
            var existePassword = await _appDBContext.Passwords.AnyAsync(p => p.Id == passwordDto.Id);

            if (existePassword)
                return new ResponseDto { IsSuccess = false, Message = "Ya existe una contraseña con el mismo Id." };

            // Crear nueva entidad Tarjeta a partir del DTO
            var newPassword = new Password
            {
                // Mapear propiedades
                UserId = userId,
                Nombre = passwordDto.Nombre,
                Url = passwordDto.Url,
                UserEmail = passwordDto.UserEmail,
                Clave = _encryptor.Encrypt(passwordDto.Clave),
                Notas = passwordDto.Notas,
                FechaCreacion = passwordDto.FechaCreacion,
                FechaActualizacion = passwordDto.FechaActualizacion,
                CategoriaId = passwordDto.CategoriaId
            };

            await _appDBContext.Passwords.AddAsync(newPassword);
            await _appDBContext.SaveChangesAsync();

            return new ResponseDto { IsSuccess = true, Message = "Contraseña creada correctamente." };
        }


        // Servicio para Actualizar
        public async Task<ResponseDto> Update(int id, int userId, PasswordDto passwordDto)
        {
            var existePassword = await _appDBContext.Passwords
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (existePassword == null)
                return new ResponseDto { IsSuccess = false, Message = "Contraseña no encontrado." };

            // Actualizar solo si hay nuevos valores
            if (!string.IsNullOrWhiteSpace(passwordDto.Nombre))
                existePassword.Nombre = passwordDto.Nombre;

            if (!string.IsNullOrWhiteSpace(passwordDto.Url))
                existePassword.Url = passwordDto.Url;

            if (!string.IsNullOrWhiteSpace(passwordDto.UserEmail))
                existePassword.UserEmail = passwordDto.UserEmail;

            if (!string.IsNullOrWhiteSpace(passwordDto.Clave))
                existePassword.Clave = _encryptor.Encrypt(passwordDto.Clave);

            if (!string.IsNullOrWhiteSpace(passwordDto.Notas))
                existePassword.Notas = passwordDto.Notas;

            if (passwordDto.CategoriaId != 0)
                existePassword.CategoriaId = passwordDto.CategoriaId;

            // Actualizar la fecha de actualización
            existePassword.FechaActualizacion = DateTime.UtcNow;

            _appDBContext.Passwords.Update(existePassword);
            await _appDBContext.SaveChangesAsync();

            return new ResponseDto { IsSuccess = true, Message = "Contraseña actualizado correctamente." };
        }


        // Servicio para Elimina una contraseña
        public async Task<bool> Delete(int id, int userId)
        {
            // Busca por ID y verifica pertenencia al usuario
            var existePassword = await _appDBContext.Passwords
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (existePassword == null) return false; // Si no existe, retorna false

            _appDBContext.Passwords.Remove(existePassword); // Elimina la tarjeta
            await _appDBContext.SaveChangesAsync(); // Guarda cambios
            return true; // Retorna éxito
        }


    }
}
