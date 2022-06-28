using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Interfaces
{
    public interface IProduct
    {

        Task<ActionResult<IEnumerable<Product>>> GetAll();
        IEnumerable<TableHelpProvince> Report(string report);
        Task<ActionResult<Product>> GetById(int id);
        EntityState Update(int id, Product Product);
        Task<ActionResult<Product>> Create(Product prod);
        Task<bool> Delete(int id);
        bool Exists(int id);
    }
}
