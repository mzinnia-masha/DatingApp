using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        private readonly IToken_Service _token;

        public AccountController(DataContext context, IToken_Service token)
        {
            _context = context;
            _token = token;
        }

  
        [HttpPost("Register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterUser _registerUser)
        {
            if (await UserExist(_registerUser.Username)) return BadRequest("User already exist");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = _registerUser.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(_registerUser.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDTO
            {
                UserName = user.UserName,
                token = _token.CreateToken(user)
            };
        }

     
        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginUser _loginUser)
        {

            var user = await _context.Users.SingleOrDefaultAsync(x=>x.UserName==_loginUser.Username);
            if (user == null) return Unauthorized("Invalid Username");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(_loginUser.Password));
            for(int i=0;i<computedHash.Length;i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid Password");
            }

            return new UserDTO
            {
                UserName = user.UserName,
                token = _token.CreateToken(user)
            };

        }

  



    private async Task<bool> UserExist(string username)
    {

           return await  _context.Users.AnyAsync(x=>x.UserName==username.ToLower());


    } 
    
    
    }
}
