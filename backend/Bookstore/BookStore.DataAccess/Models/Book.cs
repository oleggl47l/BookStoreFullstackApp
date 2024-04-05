﻿namespace Bookstore.Models;

public class Book {
    public Guid BookId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; } 
    public int Quantity { get; set; }
    public byte[] Image { get; set; }
}