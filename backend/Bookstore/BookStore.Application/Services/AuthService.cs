﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookStore.Application.Security;
using Bookstore.Configurations;
using BookStore.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BookStore.Application.Services;

public class AuthService {
    private readonly BookStoreDbContext _context;

    public AuthService(BookStoreDbContext context) {
        _context = context;
    }

    public async Task<string> AuthenticateAsync(string email, string password) {
        var user = await _context.Users.Include(user => user.Role).FirstOrDefaultAsync(u => u.Email == email);

        if (user == null) {
            return null;
        }

        if (!PasswordHasher.VerifyPassword(password, user.PasswordHash)) {
            return null;
        }

        var claims = new List<Claim> {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.GivenName, user.FirstName),
            new Claim(ClaimTypes.Surname, user.LastName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.Name)
        };

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthConfig.KEY));

        var jwt = new JwtSecurityToken(
            issuer: AuthConfig.ISSUER,
            audience: AuthConfig.AUDIENCE,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromHours(2)),
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
}