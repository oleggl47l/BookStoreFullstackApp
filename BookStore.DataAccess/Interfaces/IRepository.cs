using Bookstore.Models;

namespace BookStore.DataAccess.Interfaces;

public interface IRepository<TEntity> {
    Task<List<TEntity>> GetAll();
    Task<TEntity> GetById(Guid id);
    Task<TEntity> Create(TEntity entity);
    Task<TEntity> Update(TEntity entity);
    Task<TEntity> Delete(Guid id);
}