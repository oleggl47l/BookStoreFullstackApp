using BookStore.Application.Security;
using BookStore.DataAccess;
using Bookstore.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Application.Services;

public class RegistrationService {
    private readonly BookStoreDbContext _context;

    public RegistrationService(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<User> RegisterAsync(string firstName, string lastName, string email, string password) {
        if (await _context.Users.AnyAsync(u => u.Email == email)) {
            throw new ArgumentException("User with this email already exists", nameof(email));
        }
        
        var user = new User {
            UserId = Guid.NewGuid(),
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            PasswordHash = PasswordHasher.HashPassword(password),
            RoleId = new Guid("3fa85f64-5717-4562-b3fc-2c963f66afa6")
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return user;
    }
}