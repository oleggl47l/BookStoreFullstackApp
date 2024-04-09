using BookStore.Application.Interfaces;
using Bookstore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
// [Authorize(Policy = "Admin")]

public class UserCRUDController(ICRUDService<User> icrudService) : ControllerBase {
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAllUsers() {
        var User = await icrudService.GetAll();
        return Ok(User);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(Guid id) {
        var user = await icrudService.GetById(id);
        if (user == null) {
            return BadRequest("Wrong ID");
        }

        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] User user) {
        var createdUser = await icrudService.Create(user);
        return CreatedAtAction(nameof(GetUserById), new { id = createdUser.UserId }, createdUser);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<User>> UpdateUser(Guid id, [FromBody] User user) {
        if (id != user.UserId) {
            return BadRequest("Wrong ID");
        }

        var updatedUser = await icrudService.Update(user);
        return Ok(updatedUser);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(Guid id) {
        return Ok(await icrudService.Delete(id));
    }
}