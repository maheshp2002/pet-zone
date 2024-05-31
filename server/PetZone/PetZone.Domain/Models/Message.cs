using System.ComponentModel.DataAnnotations.Schema;

namespace PetZone.Domain.Models;

public class Message
{
    public int Id { get; set; }

    public DateTime? Time { get; set; }

    public string? Content { get; set; }

    [ForeignKey(nameof(ChatId))]
    public int? ChatId { get; set; }

    public Chat? Chat { get; set; }

    [ForeignKey(nameof(SenderId))]
    public string? SenderId { get; set; }

    public ApplicationUser? Sender { get; set; }

    public bool IsDeleted { get; set; }
}
