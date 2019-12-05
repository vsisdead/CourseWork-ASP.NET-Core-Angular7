using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserDetailContext _context;

        public AuthController(UserDetailContext context)
        {
            _context = context;
        }

        [HttpPost("Register")]
        public ActionResult Register(RegisterModel registerModel)
        {
            if (registerModel == null)
            {
                return BadRequest("Register model is empty");
            }

            if (string.IsNullOrWhiteSpace(registerModel.Password) || string.IsNullOrWhiteSpace(registerModel.Login))
            {
                return BadRequest("wtf");
            }

            var user = new UserDetail
            {
                UBdate = registerModel.Bday,
                ULogin = registerModel.Login,
                URole = Role.Guest,
                UFullname = registerModel.FullName,
                UImg = registerModel.Image

            };

            var password_salt = Guid.NewGuid().ToString();
            var password_hash = PN.Crypt.AES.SHA256Hash(registerModel.Password + password_salt);
            user.PasswordSalt = password_salt;
            user.PasswordHash = password_hash;

            var checklogin = _context.UserDetails.ToList().FirstOrDefault(p => p.ULogin == registerModel.Login);
            if (checklogin != null)
            {
                return BadRequest("This login is zanyat");
            }

            _context.UserDetails.Add(user);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("Login")]
        public ActionResult Login(LoginModel loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest("wtf");
            }

            if (string.IsNullOrWhiteSpace(loginModel.Login) || string.IsNullOrWhiteSpace(loginModel.Password))
            {
                return BadRequest("wtf");
            }

            var user = _context.UserDetails.ToList().FirstOrDefault(p => p.ULogin == loginModel.Login);
            if (user == null)
            {
                return BadRequest("wtf");
            }

            if (user.PasswordHash != PN.Crypt.AES.SHA256Hash(loginModel.Password + user.PasswordSalt))
            {
                return BadRequest("incorrect password");
            }

            var fullname = user.UFullname;
            var role = user.URole;
            return Ok(new { role, fullname } );
        }
    }
}