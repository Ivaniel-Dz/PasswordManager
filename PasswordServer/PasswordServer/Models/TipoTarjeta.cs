namespace PasswordServer.Models
{
    public class TipoTarjeta
    {
        public int Id { get; set; }
        public string Nombre { get; set; } // Ej: "Débito", "Crédito", "Prepago"
        public string? Descripcion { get; set; } = null; // Opcional

        // Propiedad de navegación (un TipoTarjeta puede estar en muchas Tarjetas)
        public ICollection<Tarjeta> Tarjetas { get; set; }
    }
}
