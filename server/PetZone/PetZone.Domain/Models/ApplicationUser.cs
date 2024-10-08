﻿using Microsoft.AspNetCore.Identity;

namespace PetZone.Domain.Models;

public class ApplicationUser : IdentityUser
{
    public string? Name { get; set; }

    public bool IsAdmin { get; set; }

    public string? ProfileImage {  get; set; }

    public string? BuildingName { get; set; }

    public string? StreetAddress { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Country { get; set; }

    public int? PinCode { get; set; }
}
