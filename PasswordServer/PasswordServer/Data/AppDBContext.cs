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
        public DbSet<CategoriaPassword> CategoriasPass { get; set; }
        public DbSet<Tarjeta> Tarjetas { get; set; }
        public DbSet<RedTarjeta> RedTarjetas { get; set; }
        public DbSet<TipoTarjeta> TipoTarjetas { get; set; }

        // Método para configurar la base de datos (se deja vacío para evitar sobreescritura)
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define los columnas de las tablas
            modelBuilder.Entity<Usuario>(tb => {
                tb.ToTable("Usuarios");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.Nombre).HasMaxLength(50);
                tb.Property(col => col.Correo).HasMaxLength(50);
                tb.Property(col => col.Clave).HasMaxLength(100);
            });

            modelBuilder.Entity<Password>(tb => {
                tb.ToTable("Passwords");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.UserId).HasColumnType("int");
                tb.Property(col => col.Nombre).HasMaxLength(50);
                tb.Property(col => col.Url).HasMaxLength(50);
                tb.Property(col => col.UserEmail).HasMaxLength(50);
                tb.Property(col => col.Clave).HasMaxLength(100);
                tb.Property(col => col.Notas).HasMaxLength(250);
                tb.Property(col => col.FechaCreacion).HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAdd();
                tb.Property(col => col.FechaActualizacion).HasDefaultValueSql("CURRENT_TIMESTAMP").ValueGeneratedOnAdd();
                tb.Property(col => col.CategoriaId).HasColumnType("int");

                // Relacion Password - User
                tb.HasOne(p => p.Usuario)
                          .WithMany(u => u.Passwords)
                          .HasForeignKey(p => p.UserId)
                          .OnDelete(DeleteBehavior.Cascade);

                // Relacion Password - Categoria
                tb.HasOne(p => p.CategoriaPassword)
                          .WithMany(c => c.Passwords)
                          .HasForeignKey(p => p.CategoriaId)
                          .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<CategoriaPassword>(tb =>
            {
                tb.ToTable("CategoriasPassword");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.Nombre).HasMaxLength(50);
                tb.Property(col => col.Descripcion).HasMaxLength(250);
            });

            modelBuilder.Entity<Tarjeta>(tb => {
                tb.ToTable("Tarjetas");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.UserId).HasColumnType("int");
                tb.Property(col => col.Numeracion).HasMaxLength(20);
                tb.Property(col => col.FechaExpiracion).HasMaxLength(5);
                tb.Property(col => col.NombreTitular).HasMaxLength(50);
                tb.Property(col => col.NombreTarjeta).HasMaxLength(50);
                tb.Property(col => col.Descripcion).HasMaxLength(250);
                tb.Property(col => col.RedId).HasColumnType("int");
                tb.Property(col => col.TipoId).HasColumnType("int");

                // Relacion Tarjeta - User
                tb.HasOne(t => t.Usuario)
                          .WithMany(u => u.Tarjetas)
                          .HasForeignKey(t => t.UserId)
                          .OnDelete(DeleteBehavior.Cascade);

                // Relación con RedTarjeta
                tb.HasOne(t => t.RedTarjeta)
                      .WithMany(r => r.Tarjetas)
                      .HasForeignKey(t => t.RedId)
                      .OnDelete(DeleteBehavior.Restrict); // No eliminar Red si hay Tarjeta

                // Relación con TipoTarjeta
                tb.HasOne(t => t.TipoTarjeta)
                      .WithMany(tt => tt.Tarjetas)
                      .HasForeignKey(t => t.TipoId)
                      .OnDelete(DeleteBehavior.Restrict); // No eliminar Tipo si hay Tarjeta

            });

            modelBuilder.Entity<RedTarjeta>(tb =>
            {
                tb.ToTable("RedTarjetas");
                tb.HasKey(col  => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.Nombre).HasMaxLength(50);
                tb.Property(col => col.Descripcion).HasMaxLength(250);
            });

            modelBuilder.Entity<TipoTarjeta>(tb =>
            {
                tb.ToTable("TipoTarjetas");
                tb.HasKey(col => col.Id);
                tb.Property(col => col.Id).UseIdentityColumn().ValueGeneratedOnAdd();
                tb.Property(col => col.Nombre).HasMaxLength(50);
                tb.Property(col => col.Descripcion).HasMaxLength(250);
            });

        }
    }

}
