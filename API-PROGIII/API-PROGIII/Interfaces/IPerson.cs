using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Interfaces
{
    public interface IPerson 
    { 

        Task<ActionResult<IEnumerable<Person>>> GetAll(string is_client);
        IEnumerable<TableHelpProvince> Report(string report);
        Task<ActionResult<Person>> GetById(int id);
        EntityState Update(int id, Person person);
        Task<ActionResult<Person>> Create(Person person);
        Task<bool> Delete(int id);
        bool Exists(int id);

    }
}
