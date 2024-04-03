using System.Diagnostics.CodeAnalysis;
using BookStore.DataAccess.Interfaces;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositories;

public class BookRepository : IRepository<Book> {
    private readonly BookStoreDbContext _context;

    public BookRepository(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<List<Book>> GetAll() {
        return await _context.Set<Book>().ToListAsync();
    }

    public async Task<Book?> GetById(Guid id) {
        return await _context.Set<Book>().FirstOrDefaultAsync(b => b.BookId == id);
    }

    public async Task<Book> Create(Book book) {
        _context.Set<Book>().Add(book);
        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<Book> Update(Book book) {
        _context.Set<Book>().Update(book);
        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<Book> Delete(Guid id) {
        var book = await _context.Set<Book>().FirstOrDefaultAsync(b => b.BookId == id);
        if (book == null)
            return book;

        _context.Set<Book>().Remove(book);
        await _context.SaveChangesAsync();
        
        return book;
    }
}