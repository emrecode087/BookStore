using BookStore_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
