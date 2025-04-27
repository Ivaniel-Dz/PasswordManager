namespace PasswordServer.DTO
{
    public class PasswordDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Nombre { get; set; }
        public string Url { get; set; }
        public string UserEmail { get; set; }
        public string Clave { get; set; }
        public string? Notas { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
        public DateTime FechaActualizacion { get; set; } = DateTime.UtcNow;
        public int CategoriaId { get; set; }
        public string? CategoriaNombre { get; set; }
    }
}
