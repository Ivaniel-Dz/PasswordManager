using PasswordServer.Models;

namespace PasswordServer.DTO
{
    public class PasswordDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Titulo { get; set; }
        public string UserEmail { get; set; }
        public string PasswordHash { get; set; }
        public string URL { get; set; }
        public string Categoria { get; set; } // Se puede separar en un modelo aparte

        // Propiedad de Navegacion
        public Usuario Usuario { get; set; } // Relacion con usuario
    }
}
