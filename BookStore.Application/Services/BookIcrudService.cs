using BookStore.Application.Interfaces;
using BookStore.DataAccess.Interfaces;
using Bookstore.Models;

namespace BookStore.Application.Services;

public class BookIcrudService : ICRUDService<Book> {
    private readonly IRepository<Book> _repository;

    public BookIcrudService(IRepository<Book> repository) {
        _repository = repository;
    }

    public async Task<List<Book>> GetAll() {
        return await _repository.GetAll();
    }

    public async Task<Book?> GetById(Guid id) {
        return await _repository.GetById(id);
    }

    public async Task<Book> Create(Book book) {
        return await _repository.Create(book);
    }
    
    public async Task<Book> Update(Book book) {
        return await _repository.Update(book);
    }
    
    public async Task<Book> Delete(Guid id) {
        return await _repository.Delete(id);
    }
}