namespace PasswordServer.DTO
{
    public class RegistroDto
    {
        public string Nombre { get; set; } // Requerido
        public string Correo { get; set; } // Requerido
        public string Clave { get; set; } // Requerido
        public string ConfirClave { get; set; } // Requerido
    }
}
