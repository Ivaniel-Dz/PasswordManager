namespace PasswordServer.Models
{
    public class Tarjeta
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Numeracion { get; set; }
        public string FechaExpiracion { get; set; }  // MM/YY
        public string NombreTitular { get; set; }
        public string NombreTarjeta { get; set; }
        public string? Descripcion { get; set; } = null; // Opcional

        // Claves foráneas
        public int RedId { get; set; }
        public int TipoId { get; set; }
        
        // Propiedad de Navegación (EF Core)
        public Usuario Usuario { get; set; } // Relación con usuario
        public RedTarjeta RedTarjeta { get; set; } // Relación con RedTarjeta
        public TipoTarjeta TipoTarjeta { get; set; } // Relación con TipoTarjeta
    }
}
