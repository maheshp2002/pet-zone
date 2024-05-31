namespace PetZone.Services.Dto;

public class PetDetailsViewDto
{
    public int PetId { get; set; }

    public string? Age { get; set; }

    public string? Sex {  get; set; }

    public string? Color { get; set; }

    public string? Description { get; set; }

    public int? Availability { get; set; }

    public int? Price { get; set; }

    public List<string>? Images { get; set; }

    public string? Breed { get; set; }

    public string? Category { get; set; }

    public string? SellerId { get; set; }

    public string? SellerName { get; set; }

    public string? SellerAddress { get; set; }

    public bool? Status { get; set; }
}
