using BookStore.Application.Interfaces;
using BookStore.DataAccess.Interfaces;
using Bookstore.Models;

namespace BookStore.Application.Services;

public class OrderItemIcrudService : ICRUDService<OrderItem> {
    private readonly IRepository<OrderItem> _repository;

    public OrderItemIcrudService(IRepository<OrderItem> repository) {
        _repository = repository;
    }

    public async Task<List<OrderItem>> GetAll() {
        return await _repository.GetAll();
    }

    public async Task<OrderItem?> GetById(Guid id) {
        return await _repository.GetById(id);
    }

    public async Task<OrderItem> Create(OrderItem orderItem) {
        return await _repository.Create(orderItem);
    }
    
    public async Task<OrderItem> Update(OrderItem orderItem) {
        return await _repository.Update(orderItem);
    }
    
    public async Task<OrderItem> Delete(Guid id) {
        return await _repository.Delete(id);
    }
}