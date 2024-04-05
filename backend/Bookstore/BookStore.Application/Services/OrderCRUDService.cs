using BookStore.Application.Interfaces;
using BookStore.DataAccess.Interfaces;
using Bookstore.Models;

namespace BookStore.Application.Services;

public class OrderCRUDService : ICRUDService<Order> {
    private readonly IRepository<Order> _repository;

    public OrderCRUDService(IRepository<Order> repository) {
        _repository = repository;
    }

    public async Task<List<Order>> GetAll() {
        return await _repository.GetAll();
    }

    public async Task<Order?> GetById(Guid id) {
        return await _repository.GetById(id);
    }

    public async Task<Order> Create(Order order) {
        return await _repository.Create(order);
    }
    
    public async Task<Order> Update(Order order) {
        return await _repository.Update(order);
    }
    
    public async Task<Order> Delete(Guid id) {
        return await _repository.Delete(id);
    }
}