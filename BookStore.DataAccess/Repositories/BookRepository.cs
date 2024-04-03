using System.Diagnostics.CodeAnalysis;
using BookStore.DataAccess.Interfaces;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositories;

public class Repository : IRepository {
    private readonly BookStoreDbContext _context;

    public Repository(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<List<Book>> GetAllBook() {
        return await _context.Set<Book>().ToListAsync();
    }

    public async Task<Book?> GetBookById(Guid id) {
        return await _context.Set<Book>().FirstOrDefaultAsync(b => b.BookId == id);
    }

    public async Task<Book> CreateBook(Book book) {
        _context.Set<Book>().Add(book);
        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<Book> UpdateBook(Book book) {
        _context.Set<Book>().Update(book);
        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<Book> DeleteBook(Guid id) {
        var book = await _context.Set<Book>().FirstOrDefaultAsync(b => b.BookId == id);
        if (book == null)
            return book;

        _context.Set<Book>().Remove(book);
        await _context.SaveChangesAsync();
        
        return book;
    }
}