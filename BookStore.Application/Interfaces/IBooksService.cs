using Bookstore.Models;

namespace BookStore.Application.Interfaces;

public interface IBooksService {
    Task<List<Book>> GetAllBooks();
    Task<Book?> GetBookById(Guid id);
    Task<Book> CreateBook(Book book);
    Task<Book> UpdateBook(Book book);
    Task<Book> DeleteBook(Guid id);
}