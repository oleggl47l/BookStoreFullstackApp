using BookStore.DataAccess.Configurations;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess;

public class BookStoreDbContext : DbContext {
    public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options) {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.ApplyConfiguration(new BookConfiguration());
        modelBuilder.ApplyConfiguration(new OrderConfiguration());
        modelBuilder.ApplyConfiguration(new RoleConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
    }


    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Order> Orders { get; set; }
}