namespace PetZone.Service.Dto
{
    public class UserViewDto
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public bool IsAdmin { get; set; }

        public string? ProfileImage { get; set; }

        public string? BuildingName { get; set; }

        public string? StreetAddress { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Country { get; set; }

        public int? PinCode { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
