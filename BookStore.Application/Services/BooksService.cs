using BookStore.Application.Interfaces;
using BookStore.DataAccess.Interfaces;
using Bookstore.Models;

namespace BookStore.Application.Services;

public class BooksService : IBooksService {
    private readonly IBookRepository _bookRepository;

    public BooksService(IBookRepository bookRepository) {
        _bookRepository = bookRepository;
    }

    public async Task<List<Book>> GetAllBooks() {
        return await _bookRepository.GetAllBook();
    }

    public async Task<Book?> GetBookById(Guid id) {
        return await _bookRepository.GetBookById(id);
    }

    public async Task<Book> CreateBook(Book book) {
        return await _bookRepository.CreateBook(book);
    }
    
    public async Task<Book> UpdateBook(Book book) {
        return await _bookRepository.UpdateBook(book);
    }
    
    public async Task<Book> DeleteBook(Guid id) {
        return await _bookRepository.DeleteBook(id);
    }
}