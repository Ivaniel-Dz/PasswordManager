namespace PasswordServer.Models
{
    public class RedTarjeta
    {
        public int Id { get; set; }
        public string Nombre { get; set; } // Ej: "Visa", "Mastercard", "American Express"
        public string? Descripcion { get; set; } = null; // Opcional

        // Propiedad de navegación (una RedTarjeta puede estar en muchas Tarjetas)
        public ICollection<Tarjeta> Tarjetas { get; set; }
    }
}
