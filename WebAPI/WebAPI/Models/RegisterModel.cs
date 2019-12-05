namespace WebAPI.Models
{
    public class RegisterModel
    {
        public string Login { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        public string Bday { get; set; }

        public string Image { get; set; }

        public Role role { get; set; }

    }
}
