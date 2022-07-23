using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class TicketService : ITicket
    {
        private readonly MyDBContext? _context;

        public TicketService(MyDBContext ctx)
        {
            _context = ctx;
        }
        public async Task<ActionResult<Ticket>> Create(Ticket ticket)
        {
            _context.Ticket.Add(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }

        public async Task<bool> Delete(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);
            if (ticket == null)
            {
                return false;
            }

            _context.Ticket.Remove(ticket);

            await _context.SaveChangesAsync();

            return true;
        }

        public bool Exists(int id)
        {
            return _context.Ticket.Any(e => e.Id == id);

        }

        public async Task<ActionResult<IEnumerable<Ticket>>> GetAll()
        {
            return await _context.Ticket.ToListAsync();
        }

        public async Task<ActionResult<Ticket>> GetById(int id)
        {
            return await _context.Ticket.FindAsync(id);
        }

        public IEnumerable<TableHelp> Report(string report)
        {
            var count = _context.TableHelp.FromSqlInterpolated($"EXECUTE dbo.ProfitByYear").ToList();

            if (report == "ProfitByYearWithDetails")
            {
                count = _context.TableHelp.FromSqlInterpolated($"EXECUTE dbo.ProfitByYearWithDetails").ToList();
            }

            if (report == "TopTenProduct")
            {
                count = _context.TableHelp.FromSqlInterpolated($"EXECUTE dbo.TopTenProduct").ToList();
            }


            return count;
        }

        public EntityState Update(int id, Ticket ticket)
        {
            return _context.Entry(ticket).State = EntityState.Modified;
        }

        public int Count()
        {
            int count = _context.Ticket.Count();

            return count;
        }

        public async  Task<ActionResult<IEnumerable<Ticket>>> FindAll(string start,string end,string document)
        {
           var person=await _context.Person.Where(p => p.document_number == document).FirstAsync();
            return await _context.Ticket.Where(p => p.FK_Person == person.Id).Where(p=>p.Date>= DateTime.Parse(start)).Where(p => p.Date<= DateTime.Parse(end)).OrderByDescending(x => x.Date).ToListAsync();
        }
    }
}
