using System.Text.Json.Serialization;

namespace Bookstore.Models;

public class OrderItem {
    public Guid OrderItemId { get; set; }
    public Guid OrderId { get; set; }
    public Order Order { get; set; }
    public Guid BookId { get; set; }
    public Book Book { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}