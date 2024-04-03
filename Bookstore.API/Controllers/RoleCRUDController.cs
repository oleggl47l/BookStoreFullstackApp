using BookStore.Application.Interfaces;
using Bookstore.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoleCRUDController : ControllerBase {
    private readonly ICRUDService<Role> _icrudService;

    public RoleCRUDController(ICRUDService<Role> icrudService) {
        _icrudService = icrudService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Role>>> GetAllRoles() {
        var books = await _icrudService.GetAll();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Role>> GetRoleById(Guid id) {
        var role = await _icrudService.GetById(id);
        if (role == null) {
            return BadRequest("Wrong ID");
        }

        return Ok(role);
    }

    [HttpPost]
    public async Task<ActionResult<Role>> CreateRole([FromBody] Role role) {
        var createdRole = await _icrudService.Create(role);
        return CreatedAtAction(nameof(GetRoleById), new { id = createdRole.RoleId }, createdRole);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Role>> UpdateRole(Guid id, [FromBody] Role role) {
        if (id != role.RoleId) {
            return BadRequest("Wrong ID");
        }

        var updatedRole = await _icrudService.Update(role);
        return Ok(updatedRole);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteRole(Guid id) {
        return Ok(await _icrudService.Delete(id));
    }
}