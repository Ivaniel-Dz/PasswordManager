using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PasswordServer.Data;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Models;

namespace PasswordServer.Services
{
    public class TarjetaService : ITarjetaService
    {
        // Inyeccion de dependencias
        private readonly AppDBContext _appDBContext;

        public TarjetaService(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }

        // Obtiene todas las tarjetas de un usuario, con opción de búsqueda
        public async Task<IEnumerable<TarjetaDto>> GetAllAsync(int userId, string? term)
        {
            return await _appDBContext.Tarjetas
                // Filtra por usuario y término de búsqueda (si existe)
                .Where(t => t.UserId == userId &&
                    (string.IsNullOrEmpty(term) || // Si no hay término, devuelve todas
                     t.Descripcion.Contains(term) || // Busca en descripción
                     t.NombreTitular.Contains(term) || // Busca en nombre del titular
                     t.RedTarjeta.Contains(term) || // Busca en red de tarjeta
                     t.TipoTarjeta.Contains(term))) // Busca en tipo de tarjeta
                 // Mapea a DTO para no exponer la entidad completa
                .Select(t => new TarjetaDto
                {
                    Id = t.Id,
                    Numeracion = t.Numeracion,
                    FechaExpiracion = t.FechaExpiracion,
                    NombreTitular = t.NombreTitular,
                    RedTarjeta = t.RedTarjeta,
                    TipoTarjeta = t.TipoTarjeta,
                    Descripcion = t.Descripcion
                })
                .ToListAsync(); // Ejecuta la consulta asíncronamente
        }


        // Obtiene una tarjeta específica por ID y verifica pertenencia al usuario
        public async Task<TarjetaDto?> GetByIdAsync(int id, int userId)
        {
            // Busca la tarjeta que coincida con ID y usuario
            var tarjeta = await _appDBContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (tarjeta == null) return null; // Si no existe, retorna null

            // Mapea a DTO
            return new TarjetaDto
            {
                Id = tarjeta.Id,
                Numeracion = tarjeta.Numeracion,
                FechaExpiracion = tarjeta.FechaExpiracion,
                NombreTitular = tarjeta.NombreTitular,
                RedTarjeta = tarjeta.RedTarjeta,
                TipoTarjeta = tarjeta.TipoTarjeta,
                Descripcion = tarjeta.Descripcion
            };
        }

        // Crea una nueva tarjeta para el usuario
        public async Task<object> CreateAsync(TarjetaDto dto, int userId)
        {
            // Crea nueva entidad Tarjeta con datos del DTO
            var nueva = new Tarjeta
            {
                UserId = userId, // Asigna el usuario propietario
                Numeracion = dto.Numeracion,
                FechaExpiracion = dto.FechaExpiracion,
                NombreTitular = dto.NombreTitular,
                RedTarjeta = dto.RedTarjeta,
                TipoTarjeta = dto.TipoTarjeta,
                Descripcion = dto.Descripcion
            };

            await _appDBContext.Tarjetas.AddAsync(nueva); // Añade a la base de datos
            await _appDBContext.SaveChangesAsync(); // Guarda cambios

            // Retorna resultado exitoso
            return new { isSuccess = true, Response = "Tarjeta creada correctamente." };
        }


        // Actualiza una tarjeta existente
        public async Task<object> UpdateAsync(TarjetaDto dto, int userId)
        {
            // Busca tarjeta por ID y verifica pertenencia al usuario
            var tarjeta = await _appDBContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == dto.Id && t.UserId == userId);

            if (tarjeta == null)
                return new { isSuccess = false, Response = "Dato no encontrado." };

            // Actualiza todos los campos con los nuevos valores
            tarjeta.Numeracion = dto.Numeracion;
            tarjeta.FechaExpiracion = dto.FechaExpiracion;
            tarjeta.NombreTitular = dto.NombreTitular;
            tarjeta.RedTarjeta = dto.RedTarjeta;
            tarjeta.TipoTarjeta = dto.TipoTarjeta;
            tarjeta.Descripcion = dto.Descripcion;

            _appDBContext.Tarjetas.Update(tarjeta); // Marca como modificada
            await _appDBContext.SaveChangesAsync(); // Guarda cambios

            return new { isSuccess = true, Response = "Tarjeta actualizada exitosamente." };
        }


        // Elimina una tarjeta
        public async Task<bool> DeleteAsync(int id, int userId)
        {
            // Busca tarjeta por ID y verifica pertenencia al usuario
            var tarjeta = await _appDBContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (tarjeta == null) return false; // Si no existe, retorna false

            _appDBContext.Tarjetas.Remove(tarjeta); // Elimina la tarjeta
            await _appDBContext.SaveChangesAsync(); // Guarda cambios
            return true; // Retorna éxito
        }

    } // Fin Clase
} // Fin
