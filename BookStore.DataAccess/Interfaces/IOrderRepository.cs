using Bookstore.Models;

namespace BookStore.DataAccess.Interfaces;

public interface IOrderRepository {
    Task<List<Order>> GetByUserId(Guid userId);
    Task<List<Order>> GetAll();
    Task<Order?> GetById(Guid id);
    Task<Order> Create(Order order);
    Task<Order> Update(Order order);
    Task<Order> Delete(Guid id);
}