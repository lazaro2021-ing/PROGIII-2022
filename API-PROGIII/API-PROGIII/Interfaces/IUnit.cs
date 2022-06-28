using API_PROGIII.Models;
using Microsoft.AspNetCore.Mvc;

namespace API_PROGIII.Interfaces
{
    public interface IUnit
    {
        Task<IEnumerable<Unit>> GetAll();
        Task<ActionResult<Unit>> Create(Unit unit);
    }
}
