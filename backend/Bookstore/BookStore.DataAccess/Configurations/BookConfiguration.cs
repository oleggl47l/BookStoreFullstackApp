﻿using Bookstore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookStore.DataAccess.Configurations;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable("Books"); 

        builder.HasKey(b => b.BookId); 

        builder.Property(b => b.Title)
            .HasMaxLength(200) 
            .IsRequired(); 

        builder.Property(b => b.Author)
            .HasMaxLength(100)
            .IsRequired(); 

        builder.Property(b => b.Description)
            .HasMaxLength(500); 

        builder.Property(b => b.Price)
            .HasColumnType("decimal(18,2)") 
            .IsRequired(); 

        builder.Property(b => b.Quantity)
            .IsRequired(); 
    }
}