using BookStore.Application.Interfaces;
using Bookstore.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderCRUDController : ControllerBase {
    private readonly ICRUDService<Order> _icrudService;

    public OrderCRUDController(ICRUDService<Order> icrudService) {
        _icrudService = icrudService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetAllOrders() {
        var orders = await _icrudService.GetAll();
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderById(Guid id) {
        var order = await _icrudService.GetById(id);
        if (order == null) {
            return BadRequest("Wrong ID");
        }

        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] Order order) {
        var createdOrder = await _icrudService.Create(order);
        return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.OrderId }, createdOrder);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Order>> UpdateOrder(Guid id, [FromBody] Order order) {
        // if (id != order.OrderId) {
        //     return BadRequest("Wrong ID");
        // }
        //
        // var updatedOrder = await _icrudService.Update(order);
        // return Ok(updatedOrder);

        var existingOrder = await _icrudService.GetById(id);
        if (existingOrder == null) {
            return BadRequest("User not found");
        }

        existingOrder.OrderDate = order.OrderDate;
        existingOrder.TotalAmount = order.TotalAmount;
        existingOrder.UserId = order.UserId;

        var result = await _icrudService.Update(order);
        return result;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOrder(Guid id) {
        return Ok(await _icrudService.Delete(id));
    }
}