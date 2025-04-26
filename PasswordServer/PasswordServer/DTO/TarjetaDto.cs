namespace PasswordServer.DTO
{
    public class TarjetaDto
    {
        public int Id { get; set; }
        public int UserId { get; set; } // FK a Usuario
        public string Numeracion { get; set; }
        public DateOnly FechaExpiracion { get; set; }  // Fecha de expiración (solo mes y año)
        public string NombreTitular { get; set; }
        public string NombreTarjeta { get; set; }
        public string? Descripcion { get; set; }
        public int RedId { get; set; } // FK a RedTarjeta
        public int TipoId { get; set; } // FK a TipoTarjeta
    }
}
