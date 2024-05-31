using System.ComponentModel.DataAnnotations.Schema;

namespace PetZone.Domain.Models;

public class Chat
{
    public int Id { get; set; }

    public string? CreatedAt { get; set; }

    [ForeignKey(nameof(SellerId))]
    public string? SellerId { get; set; }

    public ApplicationUser? Seller { get; set; }

    [ForeignKey(nameof(UserId))]
    public string? UserId { get; set; }

    public ApplicationUser? User { get; set; }

    public bool IsBlocked { get; set; }

    public bool IsRemoved { get; set; }

    public string? BlockedBy { get; set; }

    public string? RemovedBy { get; set; }

    [ForeignKey(nameof(PetDetailsId))]
    public int PetDetailsId { get; set; }

    public PetDetails? PetDetails { get; set; }

    public string? Icon { get; set; }
}
