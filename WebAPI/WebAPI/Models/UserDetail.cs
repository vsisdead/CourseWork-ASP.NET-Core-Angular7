using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class UserDetail
    {
        [Key]
        public int UId { get; set; }

        public string ULogin { get; set; }

        public string PasswordHash { get; set; }

        
        public string PasswordSalt { get; set; }

        public Role URole { get; set; }

        public string UFullname { get; set; }

        public string UBdate { get; set; }

        public string ULastmed { get; set; }

        public string ULasttran { get; set; }

        public string UImg { get; set; }
    }
}
