using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_PROGIII.Models
{
    public class Operation
    {

        


        [Key]
        public int Id { get; set; }

        public double Quantity { get; set; }

        public int FK_Product { get; set; }
        public int FK_Ticket { get; set; }

        public int FK_Type_Operation { get; set; }


        public double SubTotal { get; set; }

        public double Profit { get; set; }


        [ForeignKey("FK_Product")]
        public virtual Product? Product { get; set; }

    }
}
