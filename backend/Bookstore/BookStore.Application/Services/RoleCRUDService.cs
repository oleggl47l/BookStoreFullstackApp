using BookStore.Application.Interfaces;
using BookStore.DataAccess.Interfaces;
using Bookstore.Models;

namespace BookStore.Application.Services;

public class RoleCRUDService : ICRUDService<Role> {
    private readonly IRepository<Role> _repository;

    public RoleCRUDService(IRepository<Role> repository) {
        _repository = repository;
    }

    public async Task<List<Role>> GetAll() {
        return await _repository.GetAll();
    }

    public async Task<Role?> GetById(Guid id) {
        return await _repository.GetById(id);
    }

    public async Task<Role> Create(Role role) {
        return await _repository.Create(role);
    }
    
    public async Task<Role> Update(Role role) {
        return await _repository.Update(role);
    }
    
    public async Task<Role> Delete(Guid id) {
        return await _repository.Delete(id);
    }
}