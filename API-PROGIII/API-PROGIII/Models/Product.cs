using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_PROGIII.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Code { get; set; }

        public int Stock { get; set; }

        public double Price_Now { get; set; }

        [MaxLength(150)]
        public string? Detail { get; set; }

        [ForeignKey("FK_Type")]
        public int FK_Type { get; set; }

     
        [ForeignKey("FK_Unit")]
        public int FK_Unit { get; set; }

       
        public double Price_Buy { get; set; }

        public double Profit { get; set; }

        [ForeignKey("FK_Person")]
        public int FK_Person { get; set; }

        

    }
    public class Unit
    {
        [Key]
        public int Id { get; set; }

        public string? Unit_Name { get; set; }
    }

    public class Type
    {
        [Key]
        public int Id { get; set; }

        public string? Type_Name { get; set; }
    }
}
