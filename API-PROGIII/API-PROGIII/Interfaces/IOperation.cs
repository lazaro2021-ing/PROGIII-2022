using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Interfaces
{
    public interface IOperation
    {
        Task<ActionResult<IEnumerable<Operation>>> GetAll();
        Task<ActionResult<Operation>> GetById(int id);
        Task<ActionResult<IEnumerable<Operation>>> GetByTicketId(int id);
        EntityState Update(int id, Operation oper);
        Task<ActionResult<Operation>> Create(Operation oper);
        Task<bool> Delete(int id);
        bool Exists(int id);
    }
}
