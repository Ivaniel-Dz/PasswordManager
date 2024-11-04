namespace PasswordManager.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public  string ClaveHash { get; set; }

        // Propiedad de navegación
        public ICollection<Password> Passwords { get; set; } // Relación con Password
    }
}
