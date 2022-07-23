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
   
    public class OperationsController : ControllerBase
    {
        private readonly MyDBContext _context;
        private IOperation _iOperation;

        public OperationsController(MyDBContext context,IOperation iOperation)
        {
            _context = context;
            _iOperation = iOperation;
        }

        // GET: api/Operations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Operation>>> GetOperation()
        {
            return await _iOperation.GetAll();
        }


        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Operation>>> ByTicket([FromQuery] int id )
        {
            return await _iOperation.GetByTicketId(id);
        }

        // GET: api/Operations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Operation>> GetOperationById(int id)
        {
            var operation = await _iOperation.GetById(id);

            if (operation == null)
            {
                return NotFound();
            }

            return operation;
        }

        // PUT: api/Operations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperation(int id, Operation operation)
        {
            if (id != operation.Id)
            {
                return BadRequest();
            }

            _iOperation.Update(id, operation);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_iOperation.Exists(id))
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

    // POST: api/Operations
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
   
    [HttpPost]
    public async Task<ActionResult<Operation>> PostOperation(Operation operation)
    {
        try
        {
            var res = await _iOperation.Create(operation);
            return CreatedAtAction("GetOperation", new { id = operation.Id }, res);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
   

   



    // DELETE: api/Operations/5
    [HttpDelete("{id}")]
        public async Task<bool> DeleteOperation(int id)
        {
           

            return await _iOperation.Delete(id);
        }

        
    }
}
