using Microsoft.EntityFrameworkCore;
using API_PROGIII.Models;
using API_PROGIII.Models.GeoData;

namespace API_PROGIII.Models
{
    public class MyDBContext : DbContext
    {
        public MyDBContext (DbContextOptions<MyDBContext> options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Operation>().Navigation(c => c.Product).AutoInclude();

         
        }

        public DbSet<Person> Person { get; set; }
        
        //public DbSet<Address> Address { get; set; }

        public DbSet<City> City { get; set; }

        public DbSet<State> State { get; set; }

        public DbSet<Province> Province { get; set; }

        public DbSet<TableHelp> TableHelp { get; set; }
        public DbSet<TableHelpProvince> TableHelpProvince { get; set; }

        public DbSet<Product> Product { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        
        public DbSet<Type> Product_Type { get; set; }
        
        public DbSet<Unit> Product_Unit { get; set; }
        
        public DbSet<API_PROGIII.Models.Address> Address { get; set; }
        
        public DbSet<API_PROGIII.Models.Operation> Operation { get; set; }

       


    }

}
