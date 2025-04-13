using Microsoft.IdentityModel.Tokens;
using PasswordServer.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace PasswordServer.Jwt
{
    public class JwtService
    {
        // inyeccion de dependecias
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // Método para encriptar una cadena de texto utilizando SHA256
        public string PasswordEncoder(string clave)
        {
            using (SHA256 sha256Hash = SHA256.Create()) // Crear una instancia de SHA256
            {
                // Computar el hash a partir del texto
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(clave));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++) // Convertir el resultado a formato hexadecimal
                {
                    builder.Append(bytes[i].ToString("x2")); // Formatear el valor como hexadecimal
                }
                return builder.ToString(); // Devolver la cadena encriptada
            }
        }


        // Método para generar un token JWT
        public string GenerarJWT(Usuario modelo)
        {
            // Crear los claims (información del usuario) que irán dentro del token
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, modelo.Id.ToString()), // Claim con el ID del usuario
                new Claim(ClaimTypes.Email, modelo.Correo!) // Claim con el correo del usuario
            };

            // Obtener la clave de firma simétrica desde la configuración
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!));
            // Crear credenciales de firma utilizando la clave y el algoritmo HMAC SHA256
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            // Detalles del token (claims, tiempo de expiración y firma)
            var jwtConfig = new JwtSecurityToken(
                claims: userClaims, // Claims del token
                expires: DateTime.UtcNow.AddMinutes(10), // Expira en 10 minutos
                signingCredentials: credential // Credenciales de firma
                );

            // Crear y devolver el token JWT como cadena
            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        }


        // Método para valaidar el token
        public bool ValidarToken(string token)
        {
            var claimsPrincipal = new ClaimsPrincipal();
            var tokenHandler = new JwtSecurityTokenHandler();

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true, // Validar la clave de firma del emisor
                ValidateIssuer = false, // No validar el emisor (puedes cambiarlo según sea necesario)
                ValidateAudience = false, // No validar la audiencia (puedes cambiarlo según sea necesario)
                ValidateLifetime = true, // Validar que el token no esté expirado
                ClockSkew = TimeSpan.Zero, // No permitir margen de tiempo adicional para expiración
                IssuerSigningKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(_configuration["Jwt:key"]!)) // Clave de firma del token
            };

            try
            {
                claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return true;
            }
            catch (SecurityTokenExpiredException)
            {
                return false;
            }
            catch (SecurityTokenInvalidSignatureException)
            {
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }// Fin de la Clase
} // Fin del namespace
