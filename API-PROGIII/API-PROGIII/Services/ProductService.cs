using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class ProductService:IProduct
    {
        private readonly MyDBContext? _context;

        public ProductService(MyDBContext ctx)
        {
            _context = ctx;
        }
        public async Task<bool> Delete(int id)
        {
            var prod = await _context.Product.FindAsync(id);
            if (prod == null)
            {
                return false;
            }

            _context.Product.Remove(prod);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
           
              return await _context.Product.ToListAsync();
         
        }

        public async Task<ActionResult<Product>> GetById(int id)
        {
            var prod = await _context.Product.FindAsync(id);


            return prod;
        }

        public bool Exists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }

        public async Task<ActionResult<Product>> Create(Product prod)
        {
            _context.Product.Add(prod);
            await _context.SaveChangesAsync();

            return prod;
        }

        public EntityState Update(int id, Product prod)
        {
            return _context.Entry(prod).State = EntityState.Modified;
        }

        public IEnumerable<TableHelpProvince> Report([FromQuery] string report)
        {
            var count = _context.TableHelpProvince.FromSqlInterpolated($"EXECUTE dbo.ClientProvinceCount").ToList();
            return count;
        }
    }
}
