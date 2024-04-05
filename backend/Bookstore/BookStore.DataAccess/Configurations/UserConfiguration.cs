using Bookstore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookStore.DataAccess.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User> {
    public void Configure(EntityTypeBuilder<User> builder) {
        builder.ToTable("Users"); 

        builder.HasKey(u => u.UserId);

        builder.Property(u => u.FirstName)
            .HasMaxLength(50)
            .IsRequired(); 
        builder.Property(u => u.LastName)
            .HasMaxLength(50)
            .IsRequired(); 
        
        builder.Property(u => u.Email)
            .HasMaxLength(100) 
            .IsRequired(); 

        builder.Property(u => u.PasswordHash)
            .HasMaxLength(255) 
            .IsRequired(); 

        builder.HasOne(u => u.Role)
            .WithMany() 
            .HasForeignKey(u => u.RoleId) 
            .IsRequired(); 
    }
}