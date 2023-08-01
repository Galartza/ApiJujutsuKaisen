using Microsoft.EntityFrameworkCore;

namespace ApiJujutsuKaisen.Models;

public class PersonajesContext : DbContext
{
    public PersonajesContext(DbContextOptions<PersonajesContext> options)
        : base(options)
    {
    }

    public DbSet<Personajes> Personajes { get; set; } = null!;
}
