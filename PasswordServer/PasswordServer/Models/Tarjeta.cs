namespace PasswordServer.Models
{
    public class Tarjeta
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Numeracion { get; set; }
        public DateOnly FechaExpiracion { get; set; }  // Fecha de expiración (solo mes y año)
        public string NombreTitular { get; set; }
        public string RedTarjeta { get; set; }
        public string TipoTarjeta { get; set; }
        public string Descripcion { get; set; }

        // Propiedad de Navegación
        public Usuario Usuario { get; set; } // Relación con usuario
    }
}
