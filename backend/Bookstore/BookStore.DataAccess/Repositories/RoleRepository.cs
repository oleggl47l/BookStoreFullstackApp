using BookStore.DataAccess.Interfaces;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositories;

using System.Diagnostics.CodeAnalysis;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;


public class RoleRepository : IRepository<Role> {
    private readonly BookStoreDbContext _context;

    public RoleRepository(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<List<Role>> GetAll() {
        return await _context.Set<Role>().ToListAsync();
    }

    public async Task<Role?> GetById(Guid id) {
        return await _context.Set<Role>().FirstOrDefaultAsync(r => r.RoleId == id);
    }

    public async Task<Role> Create(Role role) {
        _context.Set<Role>().Add(role);
        await _context.SaveChangesAsync();

        return role;
    }

    public async Task<Role> Update(Role role) {
        _context.Set<Role>().Update(role);
        await _context.SaveChangesAsync();

        return role;
    }

    public async Task<Role> Delete(Guid id) {
        var role = await _context.Set<Role>().FirstOrDefaultAsync(r => r.RoleId == id);
        if (role == null)
            return role;

        _context.Set<Role>().Remove(role);
        await _context.SaveChangesAsync();
        
        return role;
    }
}
