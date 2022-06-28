using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class TypeService:IType
    {
        private readonly MyDBContext? _context;

        public TypeService(MyDBContext ctx)
        {
            _context = ctx;
        }


        public async Task<ActionResult<Models.Type>> Create(Models.Type type)
        {
            _context.Product_Type.Add(type);
            await _context.SaveChangesAsync();

            return type;
        }

        public async Task<IEnumerable<Models.Type>> GetAll()
        {
            return await _context.Product_Type.ToListAsync();
        }
    }
}
