using BookStore.Application.Services;
using BookStore.Application.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RegistrationController : ControllerBase {
    private readonly RegistrationService _registrationService;

    public RegistrationController(RegistrationService registrationService) {
        _registrationService = registrationService;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterAsync([FromBody] RegistrationModel registrationModel) {
        var user = await _registrationService.RegisterAsync(registrationModel.FirstName, registrationModel.LastName,
            registrationModel.Email, registrationModel.Password);
        return Ok(user);
    }
}