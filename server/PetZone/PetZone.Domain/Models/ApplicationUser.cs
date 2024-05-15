using Microsoft.AspNetCore.Identity;

namespace PetZone.Domain.Models;

public class ApplicationUser : IdentityUser
{
    public string? Name { get; set; }

    public bool IsAdmin { get; set; }

    public string? ProfileImage {  get; set; }
}
