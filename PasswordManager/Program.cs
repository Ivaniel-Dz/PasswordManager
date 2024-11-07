using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Conexion a BBDD
builder.Services.AddDbContext<AppDBContext>( options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("connection"));
});

// Registrar servicios personalizados
builder.Services.AddSingleton<PassHasher>(); // Servicio singleton para servicios personalizadas
builder.Services.AddSingleton<PassEncryptor>();

// Autenticacion de Login con Cookie (Claim)
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Login/Index";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        options.AccessDeniedPath = "/Home/Privacy";
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

// Middleware
app.UseAuthentication(); // Middleware de Autenticación

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
