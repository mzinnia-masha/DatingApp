using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IToken_Service
    {
         string CreateToken(AppUser user);
    }
}
