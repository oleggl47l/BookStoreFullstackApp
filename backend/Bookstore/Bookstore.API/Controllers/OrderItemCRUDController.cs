using BookStore.Application.Interfaces;
using Bookstore.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderItemCRUDController : ControllerBase {
    private readonly ICRUDService<OrderItem> _icrudService;

    public OrderItemCRUDController(ICRUDService<OrderItem> icrudService) {
        _icrudService = icrudService;
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderItem>>> GetAllOrderItems() {
        var orderItems = await _icrudService.GetAll();
        return Ok(orderItems);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderItem>> GetOrderItemById(Guid id) {
        var orderItem = await _icrudService.GetById(id);
        if (orderItem == null) {
            return BadRequest("Wrong ID");
        }

        return Ok(orderItem);
    }

    [HttpPost]
    public async Task<ActionResult<OrderItem>> CreateOrderItem([FromBody] OrderItem orderItem) {
        var createdOrderItem = await _icrudService.Create(orderItem);
        return CreatedAtAction(nameof(GetOrderItemById), new { id = createdOrderItem.OrderItemId }, createdOrderItem);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<OrderItem>> UpdateOrderItem(Guid id, [FromBody] OrderItem orderItem) {
        // if (id != orderItem.OrderItemId) {
        //     return BadRequest("Wrong ID");
        // }
        //
        // var updatedOrderItem = await _icrudService.Update(orderItem);
        // return Ok(updatedOrderItem);

        var existingOrderItem = await _icrudService.GetById(id);
        if (existingOrderItem == null) {
            return BadRequest("User not found");
        }

        existingOrderItem.OrderId = orderItem.OrderId;
        existingOrderItem.BookId = orderItem.BookId;
        existingOrderItem.Quantity = orderItem.Quantity;
        existingOrderItem.Price = orderItem.Price;

        var result = await _icrudService.Update(existingOrderItem);
        return result;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOrderItem(Guid id) {
        return Ok(await _icrudService.Delete(id));
    }
}