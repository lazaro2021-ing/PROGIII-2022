using API_PROGIII.Models.GeoData;

namespace API_PROGIII.Interfaces
{
    public interface IGeoData
    {
        Task<IEnumerable<City>> Citys();
        Task<IEnumerable<Province>> Provinces();
        Task<IEnumerable<State>> StatesByProvince(int id_province);

        Task<IEnumerable<City>> CityByState(int id_state);
        Task<GeoInfo> City(int? idCity);
    }
}
