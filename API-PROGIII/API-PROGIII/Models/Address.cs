using System.ComponentModel.DataAnnotations;

namespace API_PROGIII.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public int FK_City { get; set; }

        [MaxLength(100)]
        public string? street { get; set; }

        public int Number { get; set; }

        [MaxLength(50)]
        public string? Floor { get; set; }

        [MaxLength(50)]
        public string? Apartment { get; set; }
    }
}
