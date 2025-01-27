using Microsoft.AspNetCore.SignalR;

namespace Calendar.Api.Models
{
    public class User
    {
        public string? UserId { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Password { get; set; }
    }
}