using BookStore.Application.Interfaces;
using BookStore.Application.Services;
using BookStore.DataAccess;
using BookStore.DataAccess.Interfaces;
using BookStore.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

string connection =
    builder.Configuration.GetConnectionString("StoreDbContext") ?? string.Empty;
builder.Services.AddDbContext<BookStoreDbContext>(options => options.UseNpgsql(connection));

builder.Services.AddScoped<IBooksService, BooksService>();
builder.Services.AddScoped<IBookRepository, BookRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();