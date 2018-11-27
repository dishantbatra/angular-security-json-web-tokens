using Microsoft.EntityFrameworkCore;

namespace PtcApi.Model {
    public class PtcDbContext : DbContext {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppUserClaim> Claims { get; set; }

        // private const string CONN =
        //               @"Server=Localhost;
        //                 Database=PTC-Pluralsight;
        //                 Trusted_Connection=True;
        //                 MultipleActiveResultSets=true";

    //     private const string CONN = @"Server=(localdb)\MSSQLLocalDB;
    // Database=PTC-Pluralsight;
    // AttachDbFilename=E:\Pluralsight\Angular Path\Angular Security Using JSON Web Tokens\Application Practice\SqlData\PTC-Pluralsight.mdf;
    // MultipleActiveResultSets=true";
     private const string CONN = @"Data Source=DISHANT3146931\MSSQLSERVER1;Initial Catalog=PTC-Pluralsight;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
    

        protected override void OnConfiguring (
            DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer (CONN);
        }
    }
}