using System.ComponentModel.DataAnnotations;

namespace API_PROGIII.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public double Total { get; set; }
        public DateTime Date { get; set; }

        public int FK_Type_Operation { get; set; }

        public int FK_Person { get; set; }


        [MaxLength(14)]
        public string? code { get; set; }
    }
}
