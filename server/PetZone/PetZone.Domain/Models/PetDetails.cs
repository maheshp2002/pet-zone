using System.ComponentModel.DataAnnotations.Schema;
using static System.Net.Mime.MediaTypeNames;

namespace PetZone.Domain.Models;

public class PetDetails
{
    public int Id { get; set; }

    public string? Age { get; set; }

    public string? Sex {  get; set; }

    public string? Color { get; set; }

    public int? Availability { get; set; }

    public string? Description { get; set; }

    public int? Price { get; set; }

    public bool? Status { get; set; }

    // Backing field for Images
    private string? _images;

    [NotMapped]
    public List<string>? Images
    {
        get => _images?.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries).ToList();
        set => _images = value != null ? string.Join(";", value) : null;
    }
    [ForeignKey(nameof(BreedId))]
    public int BreedId { get; set; }

    public Breed? Breed { get; set; }

    [ForeignKey(nameof(CategoryId))]
    public int CategoryId { get; set; }

    public Category? Category { get; set; }

    [ForeignKey(nameof(SellerId))]
    public string? SellerId { get; set; }

    public ApplicationUser? Seller { get; set; }
}
