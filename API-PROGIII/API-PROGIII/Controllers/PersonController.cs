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
using API_PROGIII.Services;

namespace API_PROGIII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class PersonController : ControllerBase
    {
        private readonly MyDBContext _context;
        private readonly IPerson _personService;

        public PersonController(MyDBContext context,IPerson personService)
        {
            _context = context;
            _personService = personService;
        }

        // GET: api/Person
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons([FromQuery] string is_client)
        {
            
            var persons = await _personService.GetAll(is_client);
            return persons;
 
        }

        [HttpGet("[action]")]
        public IEnumerable<TableHelpProvince> Report([FromQuery] string report)
        {

            
            return _personService.Report(report);
        }




        // GET: api/Person/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPersonById(int id)
        {
            var person = await _personService.GetById(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        // PUT: api/Person/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Person>> PutPerson(int id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _personService.Update(id, person);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_personService.Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return person;
        }

        // POST: api/Person
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostPerson(Person person)
        {
            
            try
            {
                var personR = await _personService.Create(person);
                return CreatedAtAction("GetPersons", new { id = person.Id }, personR);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/Person/5
        [HttpDelete("{id}")]
        public async Task<bool> DeletePersonAsync(int id)
        {
            return await _personService.Delete(id);
        }

      
    }
}
