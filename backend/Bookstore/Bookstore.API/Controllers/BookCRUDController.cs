using BookStore.Application.Interfaces;
using Bookstore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class BookCRUDController : ControllerBase {
    private readonly ICRUDService<Book> _icrudService;

    public BookCRUDController(ICRUDService<Book> icrudService) {
        _icrudService = icrudService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<Book>>> GetAllBooks() {
        var books = await _icrudService.GetAll();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBookById(Guid id) {
        var book = await _icrudService.GetById(id);
        if (book == null) {
            return BadRequest("Wrong ID");
        }

        return Ok(book);
    }

    [Authorize(Policy = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook([FromBody] Book book) {
        var createdBook = await _icrudService.Create(book);
        return CreatedAtAction(nameof(GetBookById), new { id = createdBook.BookId }, createdBook);
    }

    [Authorize(Policy = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<Book>> UpdateBook(Guid id, [FromBody] Book book) {
        // if (id != book.BookId) {
        //     return BadRequest("Wrong ID");
        // }
        //
        // var updatedBook = await _icrudService.Update(book);
        // return Ok(updatedBook);
        
        var existingBook = await _icrudService.GetById(id);
        if (existingBook == null) {
            return BadRequest("Book not found");
        }

        // Обновляем только поля, которые были отправлены в запросе
        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Description = book.Description;
        existingBook.Price = book.Price;
        existingBook.Quantity = book.Quantity;
        existingBook.Image = book.Image;

        var result = await _icrudService.Update(existingBook);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBook(Guid id) {
        return Ok(await _icrudService.Delete(id));
    }
}