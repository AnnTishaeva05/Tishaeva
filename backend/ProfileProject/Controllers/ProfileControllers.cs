using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfileProject.DAL;
using ProfileProject.Models;

namespace ProfileProject.Controllers
{
    [ApiController]
    [Route("profiles")]
    public class ProfileControllers : ControllerBase
    {
        private ProfileContext _context;

        public ProfileControllers(ProfileContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<ProfileItem>> Get()
        {
            return Ok(_context.Profiles.ToList());
        }

        [HttpPost]
        public ActionResult<int> CreateProfile(ProfileItem profile)
        {
            _context.Profiles.Add(profile);
            _context.SaveChanges();

            return Ok(profile.Id);
        }

        [HttpPut]
        public ActionResult<ProfileItem> EditProfile(ProfileItem profile)
        {
            ProfileItem? oldProfile = _context.Profiles.Find(profile.Id);
            if (oldProfile == null)
            {
                return NotFound();
            }
            oldProfile.Name = profile.Name;
            oldProfile.Company = profile.Company;
            
            _context.SaveChanges();

            return Ok(oldProfile);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteProfile([FromBody] int id)
        {
            var profile = await _context.Profiles.FindAsync(id);
            if (profile == null)
            {
                return NotFound(id);
            }
            _context.Profiles.Remove(profile);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
