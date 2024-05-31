using Microsoft.AspNetCore.Http;

namespace PetZone.Services.Dto;

public class PetDetailsDto
{
    public int? Id { get; set; }

    public string? Age { get; set; }

    public string? Sex {  get; set; }

    public string? Color { get; set; }

    public string? Description { get; set; }

    public int? Availability { get; set; }

    public int? Price { get; set; }

    public IFormFile[]? Images { get; set; }

    public int Breed { get; set; }

    public int Category { get; set; }

    public string? SellerId { get; set; }

    public bool? Status { get; set; }
}
