using Microsoft.AspNetCore.Mvc;

namespace API_PROGIII.Interfaces
{
    public interface IType
    {
        Task<IEnumerable<Models.Type>> GetAll();
        Task<ActionResult<Models.Type>> Create(Models.Type type);
    }
}
