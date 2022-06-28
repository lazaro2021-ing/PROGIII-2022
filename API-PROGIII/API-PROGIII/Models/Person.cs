using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_PROGIII.Models
{

    public class Person
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string? Name { get; set; }

        [ForeignKey("Address")]
        public int FK_Address { get; set; }

      
        public string? document_number { get; set; }
        public string? document_type { get; set; }

        [MaxLength(50)]
        public string? Email { get; set; }

        [MaxLength(50)]
        public string? Telephone { get; set; }


        public bool Is_Client { get; set; }

        public bool Is_Supplier { get; set; }

        public string? code { get; set; }

    }
}
