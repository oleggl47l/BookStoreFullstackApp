using BookStore.DataAccess.Interfaces;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.DataAccess.Repositories;

public class OrderItemRepository : IRepository<OrderItem> {
    private readonly BookStoreDbContext _context;

    public OrderItemRepository(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<List<OrderItem>> GetAll() {
        return await _context.Set<OrderItem>().ToListAsync();
    }

    public async Task<OrderItem> GetById(Guid id) {
        return (await _context.Set<OrderItem>().FirstOrDefaultAsync(oi => oi.OrderItemId == id))!;
    }

    public async Task<OrderItem> Create(OrderItem orderItem) {
        _context.Set<OrderItem>().Add(orderItem);
        await _context.SaveChangesAsync();

        return orderItem;
    }

    public async Task<OrderItem> Update(OrderItem orderItem) {
        _context.Set<OrderItem>().Update(orderItem);
        await _context.SaveChangesAsync();

        return orderItem;
    }

    public async Task<OrderItem> Delete(Guid id) {
        var orderItem = await _context.Set<OrderItem>().FirstOrDefaultAsync(oi => oi.OrderItemId == id);
        if (orderItem == null)
            return orderItem;

        _context.Set<OrderItem>().Remove(orderItem);
        await _context.SaveChangesAsync();

        return orderItem;
    }
}