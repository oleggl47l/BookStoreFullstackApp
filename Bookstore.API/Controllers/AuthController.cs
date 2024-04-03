using BookStore.Application.Services;
using BookStore.Application.Utilities;
using Microsoft.AspNetCore.Mvc;

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