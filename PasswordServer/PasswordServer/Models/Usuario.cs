namespace PasswordServer.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Clave { get; set; }

        // Propiedad de navegación
        public ICollection<Password> Passwords { get; set; } // Relación con Password
        public ICollection<Tarjeta> Tarjetas { get; set; } // Relación con Tarjeta
    }
}
