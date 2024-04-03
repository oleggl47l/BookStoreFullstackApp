using Bookstore.Models;

namespace BookStore.DataAccess.Interfaces;

public interface IRepository {
    Task<List<Book>> GetAllBook();
    Task<Book> GetBookById(Guid id);
    Task<Book> CreateBook(Book book);
    Task<Book> UpdateBook(Book book);
    Task<Book> DeleteBook(Guid id);
}