using Microsoft.EntityFrameworkCore;

namespace PetZone.Domain.Models;

[Index(nameof(Name), IsUnique = true)]
public class Breed
{
    public int Id { get; set; }

    public string? Name { get; set; }
}
