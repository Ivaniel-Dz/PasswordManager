namespace PasswordServer.Models
{
    public class Tarjeta
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Numeracion { get; set; }
        public DateOnly FechaExpiracion { get; set; }  // Fecha de expiración (solo mes y año)
        public string NombreTitular { get; set; }
        public string NombreTarjeta { get; set; }
        public string RedTarjeta { get; set; } // Se puede separar en un modelo aparte
        public string TipoTarjeta { get; set; } // Se puede separar en un modelo aparte
        public string Descripcion { get; set; }

        // Propiedad de Navegación
        public Usuario Usuario { get; set; } // Relación con usuario
    }
}
