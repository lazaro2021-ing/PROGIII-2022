using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Interfaces
{
    public interface ITicket
    {

        Task<ActionResult<IEnumerable<Ticket>>> GetAll();

        Task<ActionResult<IEnumerable<Ticket>>> FindAll(string start, string end, string document);
        Task<ActionResult<Ticket>> GetById(int id);
        EntityState Update(int id, Ticket ticket);
        Task<ActionResult<Ticket>> Create(Ticket ticket);

        IEnumerable<TableHelp> Report(string report);
        Task<bool> Delete(int id);
        bool Exists(int id);
        int Count();
    }
}
