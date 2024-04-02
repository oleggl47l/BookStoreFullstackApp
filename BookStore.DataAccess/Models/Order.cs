namespace Bookstore.Models;

public class Order {
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>(); // Список позиций заказа
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
}