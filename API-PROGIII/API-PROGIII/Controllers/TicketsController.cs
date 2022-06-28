#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_PROGIII.Models;
using API_PROGIII.Interfaces;

namespace API_PROGIII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class TicketsController : ControllerBase
    {
        private readonly MyDBContext _context;
        private ITicket _iTicket;
        public TicketsController(MyDBContext context,ITicket iTicket)
        {
            _context = context;
            _iTicket = iTicket;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
        {
            return await _iTicket.GetAll();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
           return await _iTicket.GetById(id);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Ticket>>> Find([FromQuery] string start, [FromQuery] string end, [FromQuery] string document)
        {

            return await _iTicket.FindAll(start, end, document);
        }

        [HttpGet("[action]")]
        public IEnumerable<TableHelp> Report([FromQuery] string report)
        {

            return _iTicket.Report(report);
        }

       

        [HttpGet("[action]")]
        public int Count()
        {
           

            return _iTicket.Count();
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest();
            }

            _iTicket.Update(id, ticket);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_iTicket.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            try
            {
                var res = await _iTicket.Create(ticket);
                return CreatedAtAction("GetTicket", new { id = ticket.Id }, res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteTicket(int id)
        {
            return await _iTicket.Delete(id);
        }

        
    }
}
