using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class OperationService : IOperation
    {
        private readonly MyDBContext? _context;

        public OperationService(MyDBContext ctx)
        {
            _context = ctx;
        }
        public async Task<ActionResult<Operation>> Create(Operation oper)
        {
            _context.Operation.Add(oper);
            await _context.SaveChangesAsync();

            return oper;
        }

        public async Task<bool> Delete(int id)
        {
            var oper = await _context.Operation.FindAsync(id);
            if (oper == null)
            {
                return false;
            }

            _context.Operation.Remove(oper);

            await _context.SaveChangesAsync();

            return true;
        }

        public bool Exists(int id)
        {
            return _context.Operation.Any(e => e.Id == id);
        }

        public async Task<ActionResult<IEnumerable<Operation>>> GetAll()

        {
           
            return await _context.Operation.Include(p=>p.Product).ToListAsync();
        }

        public async Task<ActionResult<Operation>> GetById(int id)
        {
            return await _context.Operation.FindAsync(id);
        }

        public async Task<ActionResult<IEnumerable<Operation>>> GetByTicketId(int id)
        {
            return await _context.Operation.Where(p => p.FK_Ticket == id).ToListAsync();
        }

        public EntityState Update(int id, Operation oper)
        {
            return _context.Entry(oper).State = EntityState.Modified;
        }
    }
}
