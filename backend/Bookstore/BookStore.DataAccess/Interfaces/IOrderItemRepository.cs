using Bookstore.Models;

namespace BookStore.DataAccess.Interfaces;

public interface IOrderItemRepository {
    Task<List<OrderItem>> GetAll();
    Task<OrderItem> GetById(Guid id);
    Task<OrderItem> Create(OrderItem orderItem);
    Task<OrderItem> Update(OrderItem orderItem);
    Task<OrderItem> Delete(Guid id);
    Task<List<OrderItem>> GetCartItems(Guid userId);
    Task<OrderItem> GetByBookId(Guid userId, Guid bookId);
}