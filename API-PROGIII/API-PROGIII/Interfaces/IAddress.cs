using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Interfaces
{
    public interface IAddress
    {

        Task<ActionResult<IEnumerable<Address>>> GetAll();
        Task<ActionResult<Address>> GetById(int id);
        EntityState Update(int id, Address address);
        Task<ActionResult<Address>> Create(Address address);
        Task<bool> Delete(int id);
        bool Exists(int id);
    }
}
