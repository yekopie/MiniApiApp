using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SMGorev6.Entities;

namespace StudentsManagerApi.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Student>(student =>
            {
                student.HasKey(s => s.Id);
                student.Property(s => s.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);
                student.Property(s => s.LastName)
                    .IsRequired()
                    .HasMaxLength(50);
                student.Property(s => s.SchoolNumber)
                    .IsRequired();

                student.ToTable("Students", t =>
                {
                    t.HasCheckConstraint("CK_Users_SchoolNumber", "SchoolNumber >= 0");
                });

                student.HasIndex(s => s.SchoolNumber)
                    .IsUnique();

                student.Property(s => s.SchoolNumber)
                    .IsRequired();
            });
        }
    }
}
