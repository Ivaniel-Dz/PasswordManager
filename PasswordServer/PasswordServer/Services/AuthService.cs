using Microsoft.EntityFrameworkCore;
using PasswordServer.Data;
using PasswordServer.DTO;
using PasswordServer.Interfaces;
using PasswordServer.Jwt;
using PasswordServer.Models;

namespace PasswordServer.Services
{
    public class AuthService : IAuthService
    {
        // Inyecion de dependencias
        private readonly AppDBContext _appDBContext;
        private readonly JwtService _jwtService;

        public AuthService(AppDBContext appDBContext, JwtService jwtService)
        {
            _appDBContext = appDBContext;
            _jwtService = jwtService;
        }

        // Servicio para Registrar Usuario
        public async Task<ResponseDto> Registro(RegistroDto registro)
        {
            // Verifica si la contraseña coinciden 
            if (registro.Clave != registro.ConfirClave)
            {
                return new ResponseDto { IsSuccess = false, Message = "Las contraseñas no coinciden." };
            }

            // Verificación si el correo ya está registrado
            var existsEmail = await _appDBContext.Usuarios.AnyAsync(u => u.Correo == registro.Correo);
            if (existsEmail)
            {
                return new ResponseDto { IsSuccess = false, Message = "Ya existe un usuario con este correo." };
            }

            // Crear un nuevo modelo de usuario a partir de los datos recibidos
            var usuario = new Usuario
            {
                Nombre = registro.Nombre,
                Correo = registro.Correo,
                Clave = _jwtService.PasswordEncoder(registro.Clave),
            };

            // Agregar el nuevo usuario a la base de datos
            await _appDBContext.Usuarios.AddAsync(usuario);
            await _appDBContext.SaveChangesAsync();

            return new ResponseDto { IsSuccess = true, Message = "Usuario registrado." };
        }

        // Servicio para Iniciar Session
        public async Task<ResponseDto> Login(LoginDto login)
        {
            // Buscar al usuario por correo
            var usuario = await _appDBContext.Usuarios.FirstOrDefaultAsync(u => u.Correo == login.Correo);

            // Verifica si la contraseña es correcta
            if (usuario == null || !_jwtService.VerificarPassword(login.Clave, usuario.Clave))
            {
                return new ResponseDto { IsSuccess = false, Message= "Datos Incorrectos", Token = "" };
            }

            // Genera el token
            var token = _jwtService.GenerarJWT(usuario);

            return new ResponseDto { IsSuccess = true, Token = token };
        }

        // Servicio para validar token
        public bool ValidarToken(string token) 
        { 
            return _jwtService.ValidarToken(token);
        }

    } // Fin de la Clase

}// Fin 
