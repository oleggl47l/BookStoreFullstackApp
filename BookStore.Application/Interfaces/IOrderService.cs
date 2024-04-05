using Bookstore.Models;

namespace BookStore.Application.Interfaces;

public interface IOrderService {
    Task<List<OrderItem>> GetCartItems(Guid userId);
    Task<OrderItem> AddToCart(Guid userId, Guid bookId, int quantity);
    Task<OrderItem> UpdateCartItem(Guid userId, Guid orderItemId, int quantity);
    Task<OrderItem> RemoveFromCart(Guid userId, Guid orderItemId);
    Task<Order> PlaceOrder(Guid userId);
    Task<List<Order>> GetUserOrders(Guid userId);
    Task<Order> GetOrderDetails(Guid orderId);
}