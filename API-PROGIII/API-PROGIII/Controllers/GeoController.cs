using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using API_PROGIII.Models.GeoData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class GeoController : ControllerBase
    {
        private readonly MyDBContext _context;
        private IGeoData _iGeoData;
        public GeoController(MyDBContext context,IGeoData iGeoData)
        {
            _context = context;
            _iGeoData = iGeoData;
        }

        // GET: Citys
        [HttpGet("[action]")]
        public async Task<IEnumerable<City>> Citys()
        {
            return await _iGeoData.Citys();
        }

        // GET: Provinces
        [HttpGet("[action]")]
        public async Task<IEnumerable<Province>> Provinces()
        {
            return await _iGeoData.Provinces();
        }

        // GET: States
        [HttpGet("[action]")]
        public async Task<IEnumerable<State>> StatesByProvince([FromQuery] int id_province)
        {
            return await _iGeoData.StatesByProvince(id_province);
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<City>> CityByState([FromQuery] int id_state)
        {
            return await _iGeoData.CityByState(id_state);
        }


       
        [HttpGet("{idCity}")]
        public async Task<GeoInfo> City(int? idCity)
        {
            return await _iGeoData.City(idCity);

        }
    }
}
