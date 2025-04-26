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

        // Método para Obtener toda la lista y buscar
        public async Task<IEnumerable<TarjetaDto>> GetAll(int userId, string? term)
        {
            // Verifica si el id del usuario es mismo del autenticado
            var query = _appDBContext.Tarjetas
                .Include(t => t.RedTarjeta)
                .Include(t => t.TipoTarjeta)
                .Where(t => t.UserId == userId);

            // Buscar por termino
            if (!string.IsNullOrEmpty(term)) 
            {
                query = query.Where(t => 
                t.NombreTitular.Contains(term) ||
                t.NombreTarjeta.Contains(term) ||
                t.RedTarjeta.Nombre.Contains(term) ||
                t.TipoTarjeta.Nombre.Contains(term)
                );
            }

            return await query.Select(t => new TarjetaDto
            {
                Id = t.Id,
                UserId = t.UserId,
                Numeracion = t.Numeracion,
                FechaExpiracion = t.FechaExpiracion,
                NombreTitular = t.NombreTitular,
                NombreTarjeta = t.NombreTarjeta,
                Descripcion = t.Descripcion,
                RedId = t.RedId,
                TipoId = t.TipoId,
                RedNombre = t.RedTarjeta.Nombre,
                TipoNombre = t.TipoTarjeta.Nombre
            }).ToListAsync();
        }


        // Método para mostrar una tarjeta por id
        public async Task<TarjetaDto?> Get(int id, int userId)
        {
            var tarjeta = await _appDBContext.Tarjetas
                .Include(t => t.RedTarjeta)
                .Include(t => t.TipoTarjeta)
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (tarjeta == null) return null;

            return new TarjetaDto
            {
                Id = tarjeta.Id,
                UserId = tarjeta.UserId,
                Numeracion = tarjeta.Numeracion,
                FechaExpiracion = tarjeta.FechaExpiracion,
                NombreTitular = tarjeta.NombreTitular,
                NombreTarjeta = tarjeta.NombreTarjeta,
                Descripcion = tarjeta.Descripcion,
                RedId = tarjeta.RedId,
                TipoId = tarjeta.TipoId,
                RedNombre = tarjeta.RedTarjeta.Nombre,
                TipoNombre = tarjeta.TipoTarjeta.Nombre
            };
        }


        // Método para Agregar
        public async Task<ResponseDto> Add(TarjetaDto tarjetaDto, int userId)
        {
            // Verificar si ya existe una tarjeta con la misma Numeración
            var existeTarjeta = await _appDBContext.Tarjetas.AnyAsync(t => t.Numeracion == tarjetaDto.Numeracion);

            if (existeTarjeta)
                return new ResponseDto { IsSuccess = false, Message = "Ya existe una tarjeta con esta Numeración." };

            // Crear nueva entidad Tarjeta a partir del DTO
            var nuevaTarjeta = new Tarjeta
            {
                // Mapear propiedades
                UserId = userId,
                Numeracion = tarjetaDto.Numeracion,
                FechaExpiracion = tarjetaDto.FechaExpiracion,
                NombreTitular = tarjetaDto.NombreTitular,
                NombreTarjeta = tarjetaDto.NombreTarjeta,
                Descripcion = tarjetaDto.Descripcion,
                RedId = tarjetaDto.RedId,
                TipoId = tarjetaDto.TipoId
            };

            await _appDBContext.Tarjetas.AddAsync(nuevaTarjeta);
            await _appDBContext.SaveChangesAsync();

            return new ResponseDto { IsSuccess = true, Message = "Tarjeta creada correctamente." };
        }


        // Método para Actualizar
        public async Task<ResponseDto> Update(TarjetaDto tarjetaDto, int userId)
        {
            var existeTarjeta = await _appDBContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == tarjetaDto.Id && t.UserId == userId);

            if (existeTarjeta == null)
                return new ResponseDto { IsSuccess = false, Message = "Tarjeta no encontrada." };

            // Verificar si ya existe una tarjeta con la misma Numeración (excluyendo la actual)
            var existeNumeracion = await _appDBContext.Tarjetas
                .AnyAsync(t => t.Numeracion == tarjetaDto.Numeracion && t.Id != tarjetaDto.Id);

            if (existeNumeracion)
                return new ResponseDto { IsSuccess = false, Message = "Ya existe una tarjeta con esta Numeración." };

            // Actualizar solo si hay nuevos valores
            if (!string.IsNullOrEmpty(tarjetaDto.Numeracion))
                existeTarjeta.Numeracion = tarjetaDto.Numeracion;

            if (tarjetaDto.FechaExpiracion != default)
                existeTarjeta.FechaExpiracion = tarjetaDto.FechaExpiracion;

            if (!string.IsNullOrEmpty(tarjetaDto.NombreTitular))
                existeTarjeta.NombreTitular = tarjetaDto.NombreTitular;

            if (!string.IsNullOrEmpty(tarjetaDto.NombreTarjeta))
                existeTarjeta.NombreTarjeta = tarjetaDto.NombreTarjeta;

            if (!string.IsNullOrEmpty(tarjetaDto.Descripcion))
                existeTarjeta.Descripcion = tarjetaDto.Descripcion;

            if (tarjetaDto.RedId != 0)
                existeTarjeta.RedId = tarjetaDto.RedId;

            if (tarjetaDto.TipoId != 0)
                existeTarjeta.TipoId = tarjetaDto.TipoId;

            _appDBContext.Tarjetas.Update(existeTarjeta);
            await _appDBContext.SaveChangesAsync();

            return new ResponseDto { IsSuccess = true, Message = "Tarjeta actualizada correctamente." };
        }


        // Método para Elimina una tarjeta
        public async Task<bool> Delete(int id, int userId)
        {
            // Busca tarjeta por ID y verifica pertenencia al usuario
            var existeTarjeta = await _appDBContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (existeTarjeta == null) return false; // Si no existe, retorna false

            _appDBContext.Tarjetas.Remove(existeTarjeta); // Elimina la tarjeta
            await _appDBContext.SaveChangesAsync(); // Guarda cambios
            return true; // Retorna éxito
        }

    } // Fin Clase
} // Fin
