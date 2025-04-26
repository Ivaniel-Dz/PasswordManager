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
            var query = _appDBContext.Tarjetas.Where(t => t.UserId == userId);



        }

        // Método para mostrar una tarjeta por id
        public async Task<TarjetaDto?> GetById(int id, int userId)
        {
            var tarjeta = await _appDBContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            return tarjeta == null ? null : new TarjetaDto
            {
                Id = tarjeta.Id,
                Numeracion = tarjeta.Numeracion,
                FechaExpiracion = tarjeta.FechaExpiracion,
                NombreTitular = tarjeta.NombreTitular,
                Descripcion = tarjeta.Descripcion
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
            var cardForChanges = await _appDBContext.Tarjetas.FirstOrDefaultAsync(t => t.Id == tarjetaDto.Id && t.UserId == userId);
            if (cardForChanges == null)
                return new ResponseDto { IsSuccess = false, Message = "Tarjeta no encontrada." };

            //cardForChanges.Numeracion = tarjetaDto.Numeracion != 0 ? tarjetaDto.Numeracion : cardForChanges.Numeracion;
            cardForChanges.NombreTitular = !string.IsNullOrWhiteSpace(tarjetaDto.NombreTitular) ? tarjetaDto.NombreTitular : cardForChanges.NombreTitular;
            //cardForChanges.RedTarjeta = !string.IsNullOrWhiteSpace(tarjetaDto.RedTarjeta) ? tarjetaDto.RedTarjeta : cardForChanges.RedTarjeta;
            //cardForChanges.TipoTarjeta = !string.IsNullOrWhiteSpace(tarjetaDto.TipoTarjeta) ? tarjetaDto.TipoTarjeta : cardForChanges.TipoTarjeta;
            cardForChanges.Descripcion = !string.IsNullOrWhiteSpace(tarjetaDto.Descripcion) ? tarjetaDto.Descripcion : cardForChanges.Descripcion;

            _appDBContext.Tarjetas.Update(cardForChanges);
            await _appDBContext.SaveChangesAsync();

            return new ResponseDto { IsSuccess = true, Message = "Tarjeta actualizada correctamente." };
        }

        // Método para Elimina una tarjeta
        public async Task<bool> Delete(int id, int userId)
        {
            // Busca tarjeta por ID y verifica pertenencia al usuario
            var cardForDelete = await _appDBContext.Tarjetas
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (cardForDelete == null) return false; // Si no existe, retorna false

            _appDBContext.Tarjetas.Remove(cardForDelete); // Elimina la tarjeta
            await _appDBContext.SaveChangesAsync(); // Guarda cambios
            return true; // Retorna éxito
        }

    } // Fin Clase
} // Fin
