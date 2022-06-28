using System.ComponentModel.DataAnnotations;

namespace API_PROGIII.Models.GeoData
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string? Name { get; set; }

        public int FK_State { get; set; }
    }
}
