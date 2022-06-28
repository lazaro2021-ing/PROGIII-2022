namespace API_PROGIII.Models
{
    public class TableHelp
    {

        public int id { get; set; }
        public int yyear { get; set; }

        public int mmonth { get; set; }

        public double profit { get; set; }

        public double total { get; set; }

        public string? product { get; set; }

    }

    public class TableHelpProvince
    {
        public int Id { get; set; }
        public string? Province_Name { get; set; }
        public int Count_P { get; set; }
    }
}
