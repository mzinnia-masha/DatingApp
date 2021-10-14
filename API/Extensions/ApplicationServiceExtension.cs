using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using API.Services;
using Microsoft.EntityFrameworkCore;
using API.Helpers;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config)
        {


            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IToken_Service, TokenService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>
                (options =>
                {
                    options.UseSqlite(config.GetConnectionString("DefaultConnection"));

                });

            return services;
        }
    }
}
