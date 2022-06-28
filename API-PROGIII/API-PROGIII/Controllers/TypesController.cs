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
    public class TypesController : Controller
    {
        private readonly MyDBContext _context;
        private IType _iType;

        public TypesController(MyDBContext context,IType iType)
        {
            _context = context;
            _iType = iType;
        }

        [HttpGet]
        // GET: Types
        public async Task<IEnumerable<Models.Type>> GetAll()
        {
            return await _iType.GetAll();
        }

        [HttpPost]
        public async Task<ActionResult> PostType(Models.Type type)
        {

            try
            {
                var res = await _iType.Create(type);
                return CreatedAtAction("GetAll", new { id = type.Id }, res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }
}
