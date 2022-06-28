#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using API_PROGIII.Models;
using API_PROGIII.Interfaces;

namespace API_PROGIII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class UnitsController : Controller
    {
        private readonly MyDBContext _context;
        private IUnit _iUnit;
        public UnitsController(MyDBContext context,IUnit iUnit)
        {
            _context = context;
            _iUnit = iUnit;
        }

        [HttpGet]
        // GET: Units
        public async Task<IEnumerable<Unit>> GetAll()
        {
            return await _iUnit.GetAll();
        }

        [HttpPost]
        public async Task<ActionResult> PostUnit(Unit unit)
        {

            try
            {
                var res = await _iUnit.Create(unit);
                return CreatedAtAction("GetAll", new { id = unit.Id }, res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
