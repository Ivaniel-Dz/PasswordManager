using Microsoft.AspNetCore.Authentication.JwtBearer; // Para manejar autenticaci�n con JWT (JSON Web Tokens)
using Microsoft.EntityFrameworkCore; // Para manejar la base de datos utilizando Entity Framework Core
using Microsoft.IdentityModel.Tokens; // Para configurar la validaci�n de los tokens JWT
using System.Text; // Para manejar codificaci�n de cadenas en bytes
using PasswordServer.Data;
using PasswordServer.Jwt;
using PasswordServer.Interfaces;
using PasswordServer.Services;
using PasswordServer.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add service controllers
builder.Services.AddControllers();

// Swagger: Tool to generate API automatic documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuraci�n de la base de datos (SQL Server)
builder.Services.AddDbContext<AppDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaSQL")); // Obtener cadena de conexi�n de configuraci�n
});


// Registrar servicios personalizados
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<PassEncryptor>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ITarjetaService, TarjetaService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<IOptionService, OptionService>();


// Configuraci�n de la autenticaci�n con JWT
builder.Services.AddAuthentication(config =>
{
    config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; // Esquema predeterminado de autenticaci�n
    config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; // Esquema predeterminado para desaf�os de autenticaci�n
}).AddJwtBearer(config =>
{
    config.RequireHttpsMetadata = false; // No requiere HTTPS (�til en desarrollo)
    config.SaveToken = true; // Permitir que el servidor guarde el token
    config.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true, // Validar la clave de firma del emisor
        ValidateIssuer = false, // No validar el emisor (puedes cambiarlo seg�n sea necesario)
        ValidateAudience = false, // No validar la audiencia (puedes cambiarlo seg�n sea necesario)
        ValidateLifetime = true, // Validar que el token no est� expirado
        ClockSkew = TimeSpan.Zero, // No permitir margen de tiempo adicional para expiraci�n
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"]!)) // Clave de firma del token
    };
});

// Habilitar CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options => {
    options.AddPolicy("NewPolicy", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); // Permitir solicitudes de cualquier origen, encabezado o m�todo
    });
});

// Build the application
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Usar Swagger para documentaci�n
    app.UseSwaggerUI(); // Interfaz de usuario de Swagger
}

// Habilitar CORS con la pol�tica definida
app.UseCors("NewPolicy");

// Configure authentication and authorization
app.UseHttpsRedirection(); // Middleware de autenticaci�n
app.UseAuthorization(); // Middleware de autorizaci�n

// MAPAR THE ROUTES OF THE CONTROLLERS
app.MapControllers();

// Run the application
app.Run();
