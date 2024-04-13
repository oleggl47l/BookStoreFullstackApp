using BookStore.Application.Interfaces;
using BookStore.DataAccess.Interfaces;
using BookStore.DataAccess.Repositories;
using Bookstore.Models;

namespace BookStore.Application.Services;

public class OrderService {
    private readonly IRepository<Order> _orderRepository;
    private readonly IRepository<OrderItem> _orderItemRepository;
    private readonly IRepository<Book> _bookRepository;

    public OrderService(IRepository<Order> orderRepository, IRepository<OrderItem> orderItemRepository,
        IRepository<Book> bookRepository) {
        _orderRepository = orderRepository;
        _orderItemRepository = orderItemRepository;
        _bookRepository = bookRepository;
    }


    public async Task<OrderItem> AddToCartAsync(Guid userId, Guid bookId, int quantity) {
        var order = await GetOrCreateCartAsync(userId);

        var book = await _bookRepository.GetById(bookId);
        if (book == null) {
            throw new Exception("Книга не найдена.");
        }

        if (book.Quantity < quantity) {
            throw new Exception("На складе недостаточно экземпляров данной книги.");
        }

        if (quantity < 0) {
            throw new Exception("Количество не может быть отрицательным");
        }

        var orderItem = order.OrderItems.FirstOrDefault(oi => oi.BookId == bookId);
        if (orderItem != null) {
            orderItem.Quantity += quantity;
            orderItem.Price += book.Price * quantity;
        }
        else {
            orderItem = new OrderItem {
                OrderId = order.OrderId,
                BookId = bookId,
                Quantity = quantity,
                Price = book.Price * quantity
            };
            order.OrderItems.Add(orderItem);
        }

        order.OrderDate = DateTime.UtcNow;
        order.TotalAmount += book.Price * quantity;
        book.Quantity -= quantity;

        await _bookRepository.Update(book);
        await _orderItemRepository.Create(orderItem);
        await _orderRepository.Update(order);

        return orderItem;
    }


    // public async Task<OrderItem> AddToCartAsync(Guid userId, Guid bookId, int quantity)
    // {
    //     var order = await GetOrCreateCartAsync(userId);
    //
    //     var book = await _bookRepository.GetById(bookId);
    //     if (book == null)
    //     {
    //         throw new Exception("Книга не найдена.");
    //     }
    //
    //     if (book.Quantity < quantity)
    //     {
    //         throw new Exception("На складе недостаточно экземпляров данной книги.");
    //     }
    //
    //     if (quantity < 0)
    //     {
    //         throw new Exception("Количество не может быть отрицательным");
    //     }
    //
    //     var existingOrderItem = order.OrderItems.FirstOrDefault(oi => oi.BookId == bookId);
    //     if (existingOrderItem != null)
    //     {
    //         existingOrderItem.Quantity += quantity;
    //         existingOrderItem.Price += book.Price * quantity;
    //
    //         order.OrderDate = DateTime.UtcNow;
    //         order.TotalAmount += book.Price * quantity;
    //         book.Quantity -= quantity;
    //
    //         await _orderItemRepository.Update(existingOrderItem);
    //         await _orderRepository.Update(order);
    //
    //         return existingOrderItem;
    //     }
    //
    //     var orderItem = new OrderItem
    //     {
    //         OrderId = order.OrderId,
    //         BookId = bookId,
    //         Quantity = quantity,
    //         Price = book.Price * quantity
    //     };
    //
    //     order.OrderItems.Add(orderItem);
    //     order.OrderDate = DateTime.UtcNow;
    //     order.TotalAmount += book.Price * quantity;
    //     book.Quantity -= quantity;
    //
    //     await _bookRepository.Update(book);
    //     await _orderItemRepository.Create(orderItem);
    //     await _orderRepository.Update(order);
    //
    //     return orderItem;
    // }

    public async Task<OrderItem> RemoveFromCartAsync(Guid orderItemId) {
        var orderItem = await _orderItemRepository.GetById(orderItemId);
        if (orderItem == null) {
            throw new Exception("Элемент заказа не найден.");
        }

        var order = await _orderRepository.GetById(orderItem.OrderId);
        if (order == null) {
            throw new Exception("Заказ не найден.");
        }

        var book = await _bookRepository.GetById(orderItem.BookId);
        if (book == null) {
            throw new Exception("Книга не найдена.");
        }

        // Возвращаем количество книг на склад
        book.Quantity += orderItem.Quantity;

        // Удаляем элемент заказа
        await _orderItemRepository.Delete(orderItemId);

        // Обновляем сумму заказа
        order.TotalAmount -= orderItem.Price;

        // Обновляем заказ
        await _orderRepository.Update(order);

        // Обновляем количество книг на складе
        await _bookRepository.Update(book);

        return orderItem;
    }

    public async Task<OrderItem> UpdateCartItemQuantityAsync(Guid orderItemId, int newQuantity) {
        var orderItem = await _orderItemRepository.GetById(orderItemId);
        if (orderItem == null) {
            throw new Exception("Элемент заказа не найден.");
        }

        var order = await _orderRepository.GetById(orderItem.OrderId);
        if (order == null) {
            throw new Exception("Заказ не найден.");
        }

        var book = await _bookRepository.GetById(orderItem.BookId);
        if (book == null) {
            throw new Exception("Книга не найдена.");
        }

        book.Quantity += orderItem.Quantity;

        if (book.Quantity < newQuantity) {
            throw new Exception("На складе недостаточно экземпляров данной книги.");
        }

        if (newQuantity < 0) {
            throw new Exception("количество не может быть меньше нуля");
        }

        orderItem.Quantity = newQuantity;
        orderItem.Price = book.Price * newQuantity;

        order.TotalAmount -= orderItem.Price;
        order.TotalAmount += book.Price * newQuantity;

        order.TotalAmount = order.OrderItems.Sum(oi => oi.Price);

        book.Quantity -= newQuantity;

        await _orderRepository.Update(order);
        await _bookRepository.Update(book);
        await _orderItemRepository.Update(orderItem);

        return orderItem;
    }

    // public async Task<Order> GetCartAsync(Guid userId) {
    //     return await GetOrCreateCartAsync(userId);
    // }

    // private async Task<Order> GetOrCreateCartAsync(Guid userId) {
    //     var existingOrder = await _orderRepository.GetAll();
    //     if (existingOrder == null || existingOrder.Count == 0) {
    //         var newOrder = new Order {
    //             OrderId = Guid.NewGuid(),
    //             UserId = userId,
    //             OrderDate = DateTime.UtcNow,
    //             TotalAmount = 0,
    //             OrderItems = new List<OrderItem>()
    //         };
    //         return await _orderRepository.Create(newOrder);
    //     }
    //
    //     return existingOrder.First();
    // }

    private async Task<Order> GetOrCreateCartAsync(Guid userId) {
        var existingOrder = await _orderRepository.GetById(userId);
        if (existingOrder == null) {
            var newOrder = new Order {
                OrderId = Guid.NewGuid(),
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                TotalAmount = 0,
                OrderItems = new List<OrderItem>()
            };
            return await _orderRepository.Create(newOrder);
        }

        return existingOrder;
    }
}