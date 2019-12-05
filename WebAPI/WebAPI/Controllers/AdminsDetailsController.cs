using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsDetailsController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public AdminsDetailsController(UserDetailContext context)
        {
            _context = context;
        }

        // GET: api/AdminsDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDetail>>> GetUserDetails()
        {
            return await _context.UserDetails.ToListAsync();
        }

        // GET: api/AdminsDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDetail>> GetUserDetail(int id)
        {
            var userDetail = await _context.UserDetails.FindAsync(id);

            if (userDetail == null)
            {
                return NotFound();
            }

            return userDetail;
        }

        // GET: api/AdminsDetails/GetUserByRole?=
        [HttpGet("GetUserByRole")]
        public async Task<ActionResult<UserDetail>> GetUserDetailsByRole(Role role)
        {
            var roles = await _context.UserDetails
                .Where(p => p.URole == role)
                .ToListAsync();

            if (roles == null)
            {
                return NotFound();
            }
            return Ok(roles);
        }

        // PUT: api/AdminsDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserDetail(int id, UserDetail userDetail)
        {
            if (id != userDetail.UId)
            {
                return BadRequest();
            }

            _context.Entry(userDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AdminsDetails
        [HttpPost]
        public async Task<ActionResult<UserDetail>> PostUserDetail(UserDetail userDetail)
        {
            _context.UserDetails.Add(userDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserDetail", new { id = userDetail.UId }, userDetail);
        }

        // DELETE: api/AdminsDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDetail>> DeleteUserDetail(int id)
        {
            var userDetail = await _context.UserDetails.FindAsync(id);
            if (userDetail == null)
            {
                return NotFound();
            }

            _context.UserDetails.Remove(userDetail);
            await _context.SaveChangesAsync();

            return userDetail;
        }

        private bool UserDetailExists(int id)
        {
            return _context.UserDetails.Any(e => e.UId == id);
        }
    }
}
