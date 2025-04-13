using Microsoft.EntityFrameworkCore;
using PasswordServer.Models;

namespace PasswordServer.Data
{
    public class AppDBContext : DbContext
    {
        // Constructor por defecto
        public AppDBContext() { }

        // Constructor que recibe opciones de configuración para el contexto de la base de datos.
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        // Definir las tablas del contexto
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Password> Passwords { get; set; }
        public DbSet<Tarjeta> Tarjetas { get; set; }

        // Método para configurar la base de datos (se deja vacío para evitar sobreescritura)
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define los columnas de las tablas
            modelBuilder.Entity<Usuario>(tb =>
            {
                tb.ToTable("Usuario");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.Nombre).HasMaxLength(50);
                tb.Property(col => col.Correo).HasMaxLength(50);
                tb.Property(col => col.Clave).HasMaxLength(100);
            });

            modelBuilder.Entity<Password>(tb =>
            {
                tb.ToTable("Password");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.UserId).HasColumnType("int");
                tb.Property(col => col.Titulo).HasMaxLength(50);
                tb.Property(col => col.UserEmail).HasMaxLength(50);
                tb.Property(col => col.PasswordHash).HasMaxLength(100);
                tb.Property(col => col.URL).HasMaxLength(50);
                tb.Property(col => col.Categoria).HasMaxLength(50);

                // Relacion Password - User
                tb.HasOne<Usuario>(p => p.Usuario)
                          .WithMany(u => u.Passwords)
                          .HasForeignKey(p => p.UserId)
                          .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Tarjeta>(tb => {
                tb.ToTable("Tarjeta");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.UserId).HasColumnType("int");
                tb.Property(col => col.Numeracion).HasColumnType("int");
                tb.Property(col => col.FechaExpiracion).HasColumnType("date");
                tb.Property(col => col.NombreTitular).HasMaxLength(50);
                tb.Property(col => col.RedTarjeta).HasMaxLength(50);
                tb.Property(col => col.TipoTarjeta).HasMaxLength(50);
                tb.Property(col => col.Descripcion).HasMaxLength(50);

                // Relacion Tarjeta - User
                tb.HasOne<Usuario>(t => t.Usuario)
                          .WithMany(u => u.Tarjetas)
                          .HasForeignKey(t => t.UserId)
                          .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }

}
