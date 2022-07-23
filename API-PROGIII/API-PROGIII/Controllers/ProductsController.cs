#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using API_PROGIII.Models;
using API_PROGIII.Interfaces;

namespace API_PROGIII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class ProductsController : Controller
    {
        private readonly MyDBContext _context;
        private IProduct _iProduct;

        public ProductsController(MyDBContext context,IProduct iProduct)
        {
            _context = context;
            _iProduct = iProduct;
        }


        // GET: Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _iProduct.GetAll();
           
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var person = await _iProduct.GetById(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

      

      
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            
                var personR = await _iProduct.Create(product);
                return CreatedAtAction("GetProducts", new { id = product.Id }, personR);
            
        }

       
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutPerson(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _iProduct.Update(id, product);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_iProduct.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return product;
        }


        // GET: Products/Delete/5
        public async Task<bool> Delete(int id)
        {
            return await _iProduct.Delete(id);
        }

       

      
    }
}
