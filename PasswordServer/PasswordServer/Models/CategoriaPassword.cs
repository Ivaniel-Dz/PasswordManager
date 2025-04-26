namespace PasswordServer.Models
{
    public class CategoriaPassword
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string? Descripcion { get; set; } = null; //Opcional

        // Propiedad de navegación
        public ICollection<Password> Passwords { get; set; }
    }
}
