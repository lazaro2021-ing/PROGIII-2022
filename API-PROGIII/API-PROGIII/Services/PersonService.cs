using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class PersonService : IPerson
    {

        private readonly MyDBContext? _context;

        public PersonService(MyDBContext ctx)
        {
            _context = ctx;
        }
        public async Task<bool> Delete(int id)
        {
            var person = await _context.Person.FindAsync(id);
            if (person == null)
            {
                return false;
            }

            _context.Person.Remove(person);
            
            await _context.SaveChangesAsync();

            return true;
        }

        public  async Task<ActionResult<IEnumerable<Person>>> GetAll(string is_client)
        {
            if (is_client == "true")
            {
                return await _context.Person.Where(p => p.Is_Client == true).ToListAsync();
            }
            else
            {
                return await _context.Person.Where(p => p.Is_Supplier == true).ToListAsync();
            }
        }

        public async Task<ActionResult<Person>> GetById(int id)
        {
            var person = await _context.Person.FindAsync(id);

   
            return person;
        }

        public bool Exists(int id)
        {
            return _context.Person.Any(e => e.Id == id);
        }

        public async Task<ActionResult<Person>> Create(Person person)
        {
            _context.Person.Add(person);
            await _context.SaveChangesAsync();

           return person;
        }

        public EntityState Update(int id, Person person)
        {
            return _context.Entry(person).State = EntityState.Modified;
        }

        public IEnumerable<TableHelpProvince> Report([FromQuery] string report)
        {
            var count = _context.TableHelpProvince.FromSqlInterpolated($"EXECUTE dbo.ClientProvinceCount").ToList();
            return count;
        }
    }
}
