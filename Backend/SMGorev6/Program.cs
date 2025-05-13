
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using StudentsManagerApi.Data;
using System.Threading.Tasks;

namespace SMGorev6
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors();
            // Add services to the container.
            // sql server kullanmak istiyorsan nuget paketini kur 
            // ve konfigürasyon ayarlarýný ona göre yap ->
            // (Appsettings'de default olarak mssql tanýmlý)
            // yaþam süresi default olarak scoped
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration["ConnectionStrings:SQLiteDefault"])
                );

            builder.Services.AddControllers();
           
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin()
                );

            app.UseAuthorization();


            app.MapControllers();
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                await db.Database.EnsureDeletedAsync();
                await db.Database.EnsureCreatedAsync();
                SeedData.Init(db);
            }
            app.Run();
        }
    }
}
