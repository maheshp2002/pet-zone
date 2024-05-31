using Microsoft.EntityFrameworkCore;

namespace PetZone.Domain.Models;

[Index(nameof(Name), IsUnique = true)]
public class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }
}
