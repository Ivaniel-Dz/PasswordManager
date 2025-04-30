namespace PasswordServer.DTO
{
    public class TarjetaDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Numeracion { get; set; }
        public string FechaExpiracion { get; set; }  // MM/YY
        public string NombreTitular { get; set; }
        public string NombreTarjeta { get; set; }
        public string? Descripcion { get; set; }
        public int RedId { get; set; }
        public int TipoId { get; set; }
        public string? RedNombre { get; set; }
        public string? TipoNombre { get; set; }
    }
}
