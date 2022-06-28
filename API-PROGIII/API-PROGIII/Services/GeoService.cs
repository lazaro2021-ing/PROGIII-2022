using API_PROGIII.Interfaces;
using API_PROGIII.Models;
using API_PROGIII.Models.GeoData;
using Microsoft.EntityFrameworkCore;

namespace API_PROGIII.Services
{
    public class GeoService:IGeoData
    {
        private readonly MyDBContext? _context;

        public GeoService(MyDBContext ctx)
        {
            _context = ctx;
        }

        public async Task<GeoInfo> City(int? idCity)
        {
            GeoInfo geo = new GeoInfo();

            var result_city = await _context.City.Where(c => c.Id == idCity).ToListAsync();
            var result_state = await _context.State.Where(c => c.Id == result_city[0].FK_State).ToListAsync();
            var result_province = await _context.Province.Where(c => c.Id == result_state[0].FK_Province).ToListAsync();
            if (result_city.Count() > 0)
            {
                geo.City = result_city[0];
                geo.State = result_state[0];
                geo.Province = result_province[0];
            }

            return geo;
        }

        public async Task<IEnumerable<City>> CityByState(int id_state)
        {
            return await _context.City.Where(s => s.FK_State == id_state).ToListAsync();
        }

        public async Task<IEnumerable<City>> Citys()
        {
            return await _context.City.ToListAsync();
        }

        public async Task<IEnumerable<Province>> Provinces()
        {
            return await _context.Province.ToListAsync();
        }

        public async Task<IEnumerable<State>> StatesByProvince(int id_province)
        {
            return await _context.State.Where(s => s.FK_Province == id_province).ToListAsync();
        }
    }
}
