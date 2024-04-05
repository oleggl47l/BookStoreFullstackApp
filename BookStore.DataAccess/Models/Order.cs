using System.Text.Json.Serialization;

namespace Bookstore.Models;

public class Order {
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    [JsonIgnore]
    public User User { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public decimal TotalAmount { get; set; } 
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Список позиций заказа

}