using Microsoft.EntityFrameworkCore;
using ProfileProject.Models;

namespace ProfileProject.DAL
{
    public class ProfileContext : DbContext
    {
        public DbSet<ProfileItem> Profiles { get; set; }
        public ProfileContext(DbContextOptions<ProfileContext> options) : base(options)
        {
            Database.Migrate();
        }
    }
}
