﻿using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class UserDetailContext:DbContext
    {
        public UserDetailContext(DbContextOptions<UserDetailContext> options) : base(options)
        {

        }

        public DbSet<UserDetail> UserDetails { get; set; }
    }
}
