using BookStore.Application.Interfaces;
using BookStore.Application.Services;
using Bookstore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase {
    private readonly OrderService _orderService;

    public OrderController(OrderService orderService) {
        _orderService = orderService;
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetCart(Guid userId) {
        var cart = await _orderService.GetCartAsync(userId);
        return Ok(cart);
    }

    [HttpPost("{userId}/addItem")]
    public async Task<IActionResult> AddToCart(Guid userId, [FromBody] CartItemRequest request) {
        var orderItem = await _orderService.AddToCartAsync(userId, request.BookId, request.Quantity);
        return Ok(orderItem);
    }

    [HttpDelete("{orderItemId}")]
    public async Task<IActionResult> RemoveFromCart(Guid orderItemId) {
        try {
            var removedItem = await _orderService.RemoveFromCartAsync(orderItemId);
            return Ok(removedItem);
        }
        catch (Exception ex) {
            return BadRequest(new { message = ex.Message });
        }
    }
    [HttpPut("{orderItemId}")]
    public async Task<IActionResult> UpdateCartItemQuantity(Guid orderItemId, int newQuantity)
    {
        try
        {
            var updatedItem = await _orderService.UpdateCartItemQuantityAsync(orderItemId, newQuantity);
            return Ok(updatedItem);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}

public class CartItemRequest {
    public Guid BookId { get; set; }
    public int Quantity { get; set; }
}