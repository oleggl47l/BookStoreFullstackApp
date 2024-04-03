using BookStore.Application.Interfaces;
using Bookstore.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookCRUDController : ControllerBase {
    private readonly ICRUDService<Book> _icrudService;

    public BookCRUDController(ICRUDService<Book> icrudService) {
        _icrudService = icrudService;
    }

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

    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook([FromBody] Book book) {
        var createdBook = await _icrudService.Create(book);
        return CreatedAtAction(nameof(GetBookById), new { id = createdBook.BookId }, createdBook);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Book>> UpdateBook(Guid id, [FromBody] Book book) {
        if (id != book.BookId) {
            return BadRequest("Wrong ID");
        }

        var updatedBook = await _icrudService.Update(book);
        return Ok(updatedBook);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBook(Guid id) {
        return Ok(await _icrudService.Delete(id));
    }
}