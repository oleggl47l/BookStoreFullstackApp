using BookStore.Application.Interfaces;
using BookStore.Application.Services;
using Bookstore.Configurations;
using BookStore.DataAccess;
using BookStore.DataAccess.Interfaces;
using BookStore.DataAccess.Repositories;
using Bookstore.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

string connection =
    builder.Configuration.GetConnectionString("StoreDbContext") ?? string.Empty;
builder.Services.AddDbContext<BookStoreDbContext>(options => options.UseNpgsql(connection));

builder.Services.AddScoped<ICRUDService<Book>, BookCRUDService>();
builder.Services.AddScoped<IRepository<Book>, BookRepository>();

builder.Services.AddScoped<ICRUDService<OrderItem>, OrderItemCRUDService>();
builder.Services.AddScoped<IRepository<OrderItem>, OrderItemRepository>();

builder.Services.AddScoped<ICRUDService<Order>, OrderCRUDService>();
builder.Services.AddScoped<IRepository<Order>, OrderRepository>();

builder.Services.AddScoped<ICRUDService<Role>, RoleCRUDService>();
builder.Services.AddScoped<IRepository<Role>, RoleRepository>();

builder.Services.AddScoped<ICRUDService<User>, UserCRUDService>();
builder.Services.AddScoped<IRepository<User>, UserRepository>();

builder.Services.AddScoped<RegistrationService>();
builder.Services.AddTransient<AuthService>();

builder.Services.AddScoped<OrderService>();

builder.Services.AddSwaggerGen(opt => {
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "BookStore", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
                      "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\n" +
                      "Example: \"Bearer 1safsfsdfdfd\"",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuer = true,
            ValidIssuer = AuthConfig.ISSUER,
            ValidateAudience = true,
            ValidAudience = AuthConfig.AUDIENCE,
            ValidateLifetime = true,
            IssuerSigningKey = AuthConfig.GetSymmetricSecurityKey(),
            ValidateIssuerSigningKey = true,
        };
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();