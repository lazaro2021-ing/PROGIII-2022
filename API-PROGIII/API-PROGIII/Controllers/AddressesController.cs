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
   
    public class AddressesController : ControllerBase
    {
        private readonly MyDBContext _context;
        private IAddress _iAddress;
        public AddressesController(MyDBContext context,IAddress iAddress)
        {
            _context = context;
            _iAddress = iAddress;
        }

        // GET: api/Addresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddress()
        {
            return await _iAddress.GetAll();
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddressById(int id)
        {
            var address = await _iAddress.GetById(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        // PUT: api/Addresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Address>> PutAddress(int id, Address address)
        {
            if (id != address.Id)
            {
                return BadRequest();
            }

            _iAddress.Update(id, address);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_iAddress.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return address;
        }

        // POST: api/Addresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Address>> PostAddress(Address address)
        {
            try
            {
                var res = await _iAddress.Create(address);
                return CreatedAtAction("GetAddress", new { id = address.Id }, res);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteAddress(int id)
        {
            return await _iAddress.Delete(id);
        }

        
    }
}
