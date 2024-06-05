﻿using Microsoft.AspNetCore.Http;

namespace PetZone.Service.Dto;

public class ProfileDto
{
    public string Id { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public IFormFile ProfileImage { get; set; }

    public string? BuildingName { get; set; }

    public string? StreetAddress { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? Country { get; set; }

    public int? PinCode { get; set; }

    public string? PhoneNumber { get; set; }
}