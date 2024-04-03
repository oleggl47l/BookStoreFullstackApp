using BookStore.DataAccess.Interfaces;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositories;

public class OrderRepository : IRepository<Order> {
    private readonly BookStoreDbContext _context;

    public OrderRepository(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<List<Order>> GetAll() {
        return await _context.Set<Order>().ToListAsync();
    }

    public async Task<Order?> GetById(Guid id) {
        return await _context.Set<Order>().FirstOrDefaultAsync(o => o.OrderId == id);
    }

    public async Task<Order> Create(Order order) {
        _context.Set<Order>().Add(order);
        await _context.SaveChangesAsync();

        return order;
    }
    
    public async Task<Order> Update(Order order) {
        _context.Set<Order>().Update(order);
        await _context.SaveChangesAsync();

        return order;
    }

    public async Task<Order> Delete(Guid id) {
        var order = await _context.Set<Order>().FirstOrDefaultAsync(o => o.OrderId == id);
        if (order == null)
            return order;

        _context.Set<Order>().Remove(order);
        await _context.SaveChangesAsync();
        
        return order;
    }
}