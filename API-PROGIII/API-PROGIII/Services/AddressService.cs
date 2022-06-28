using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class AddressService :IAddress
    {
        private readonly MyDBContext? _context;

        public AddressService(MyDBContext ctx)
        {
            _context = ctx;
        }
        public async Task<bool> Delete(int id)
        {
            var address = await _context.Address.FindAsync(id);
            if (address == null)
            {
                return false;
            }

            _context.Address.Remove(address);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<ActionResult<IEnumerable<Address>>> GetAll()
        {
           
              return await _context.Address.ToListAsync();
          
        }

        public async Task<ActionResult<Address>> GetById(int id)
        {
            return await _context.Address.FindAsync(id);
        }

        public bool Exists(int id)
        {
            return _context.Address.Any(e => e.Id == id);
        }

        public async Task<ActionResult<Address>> Create(Address address)
        {
            _context.Address.Add(address);
            await _context.SaveChangesAsync();

            return address;
        }

        public EntityState Update(int id, Address address)
        {
            return _context.Entry(address).State = EntityState.Modified;
        }

       
    }
}

