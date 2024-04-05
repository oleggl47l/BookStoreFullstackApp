using BookStore.DataAccess.Interfaces;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositories;

public class UserRepository : IRepository<User> {
    private readonly BookStoreDbContext _context;

    public UserRepository(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<List<User>> GetAll() {
        return await _context.Set<User>().ToListAsync();
    }

    public async Task<User?> GetById(Guid id) {
        return await _context.Set<User>().FirstOrDefaultAsync(u => u.UserId == id);
    }

    public async Task<User> Create(User user) {
        _context.Set<User>().Add(user);
        await _context.SaveChangesAsync();

        return user;
    }
    
    public async Task<User> Update(User user) {
        _context.Set<User>().Update(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<User> Delete(Guid id) {
        var user = await _context.Set<User>().FirstOrDefaultAsync(u => u.UserId == id);
        if (user == null)
            return user;

        _context.Set<User>().Remove(user);
        await _context.SaveChangesAsync();
        
        return user;
    }
}