namespace PasswordServer.Models
{
    public class Password
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Nombre { get; set; }
        public string Url { get; set; }
        public string UserEmail { get; set; }
        public string Clave { get; set; }
        public string? Notas { get; set; } = null;

        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow; // Se setea SOLO al crear
        public DateTime FechaActualizacion { get; set; } = DateTime.UtcNow; // Se actualiza CADA vez que modifica

        // Claves foráneas
        public int CategoriaId { get; set; }

        // Propiedad de Navegación (EF Core)
        public Usuario Usuario { get; set; } // Relacion con usuario
        public CategoriaPassword CategoriaPassword { get; set; } // Relacion con categoria
    }
}
