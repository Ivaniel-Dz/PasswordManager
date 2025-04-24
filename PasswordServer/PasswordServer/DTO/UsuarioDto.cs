using System.Text.Json.Serialization;

namespace PasswordServer.DTO
{
    public class UsuarioDto
    {
        public int Id { get; set; } //Es requerido
        public string? Nombre { get; set; } // No es requerido
        public string? Correo { get; set; } // No es requerido

        // Esto permite que si no mandás la clave, ni siquiera se serialice
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Clave { get; set; } // No es requerido

    }
}
