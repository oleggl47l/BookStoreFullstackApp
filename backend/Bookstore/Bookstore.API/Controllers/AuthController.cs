using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BookStore.Application.Security;
using BookStore.Application.Services;
using BookStore.Application.Utilities;
using Bookstore.Configurations;
using BookStore.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Bookstore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : Controller {
    private readonly AuthService _authService;

    public AuthController(AuthService authService) {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginModel loginModel) {
        var token = await _authService.AuthenticateAsync(loginModel.Email, loginModel.Password);
        if (token == null) {
            return Unauthorized("Invalid email or password");
        }
        return Ok(new { Token = token });
    }
}

// public class AuthController(BookStoreDbContext context) : Controller {
//     // создаем httppost
//     [HttpPost("login")]
//     public async Task<IActionResult> LoginAsync(string email, string password) {
//         // проверка наличия контекста и пользователей
//         Debug.Assert(context.Users != null, "context.Users != null");
//         // поиск пользователя по email с учетом его роли
//         var user = await context.Users.Include(user => user.Role).FirstOrDefaultAsync(u => u.Email == email);
//         // формирование списка утверждений (claims) для JWT токена
//         var claims = new List<Claim> {
//             new Claim(ClaimTypes.GivenName, user.FirstName),
//             new Claim(ClaimTypes.Surname, user.LastName),
//             new Claim(ClaimTypes.Email, user.Email),
//             new Claim(ClaimTypes.Role, user.Role.Name),
//         };
//         // создание JWT токена
//         var jwt = new JwtSecurityToken(
//             issuer: AuthConfig.ISSUER,
//             audience: AuthConfig.AUDIENCE,
//             claims: claims,
//             expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
//             signingCredentials: new SigningCredentials(AuthConfig.GetSymmetricSecurityKey(),
//                 SecurityAlgorithms.HmacSha256));
//
//         // проверка наличия пользователя и совпадения пароля
//         if (user == null) {
//             return NotFound("User not found.");
//         }
//
//         if (!PasswordHasher.VerifyPassword(password, user.PasswordHash)) {
//             return Unauthorized("Invalid password.");
//         }
//
//         // формирует строку токена и возвращаем успешный результат с токеном
//         var tokenString = new JwtSecurityTokenHandler().WriteToken(jwt);
//         return Ok(new { Token = tokenString });
//     }
// }