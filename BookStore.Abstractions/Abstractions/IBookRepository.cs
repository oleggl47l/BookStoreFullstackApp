using Book.Models;

namespace BookStore.Abstractions.Abstractions;

public interface IBookRepository {
    Task<List<Book>> GetAllBooks();
    Task<Book?> GetBookById(Guid id);
    Task<Book> AddBook(Book book);
    Task<Book> UpdateBook(Book book);
    Task<Book> DeleteBook(Guid id);
}