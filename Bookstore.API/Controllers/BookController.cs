using BookStore.Application.Interfaces;
using BookStore.Application.Services;
using Bookstore.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase {
    private readonly IBooksService _booksService;

    public BookController(IBooksService booksService) {
        _booksService = booksService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Book>>> GetAllBooks() {
        var books = await _booksService.GetAllBooks();
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBookById(Guid id) {
        var book = await _booksService.GetBookById(id);
        if (book == null) {
            return BadRequest("Wrong ID");
        }

        return Ok(book);
    }

    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook([FromBody] Book book) {
        var createdBook = await _booksService.CreateBook(book);
        return CreatedAtAction(nameof(GetBookById), new { id = createdBook.BookId }, createdBook);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Book>> UpdateBook(Guid id, [FromBody] Book book) {
        if (id != book.BookId) {
            return BadRequest("Wrong ID");
        }

        var updatedBook = await _booksService.UpdateBook(book);
        return Ok(updatedBook);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteBook(Guid id) {
        return Ok(await _booksService.DeleteBook(id));
    }
}