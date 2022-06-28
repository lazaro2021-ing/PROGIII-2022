using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class UnitService:IUnit
    {
        private readonly MyDBContext? _context;

        public UnitService(MyDBContext ctx)
        {
            _context = ctx;
        }

        public async Task<ActionResult<Unit>> Create(Unit unit)
        {
            _context.Product_Unit.Add(unit);
            await _context.SaveChangesAsync();

            return unit;
        }

        public async Task<IEnumerable<Unit>> GetAll()
        {
            return await _context.Product_Unit.ToListAsync();
        }
    }
}
