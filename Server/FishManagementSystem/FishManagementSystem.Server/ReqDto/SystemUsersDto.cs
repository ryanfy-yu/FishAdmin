namespace FishManagementSystem.Server.ReqDto
{
    public class SystemUsersDto
    {

        public string Id { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }

        public int? UserType { get; set; }

        public string? ImageUrl { get; set; }


        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public int? Status { get; set; }
    }
}
