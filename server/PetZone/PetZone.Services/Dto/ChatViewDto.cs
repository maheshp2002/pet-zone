namespace PetZone.Services.Dto;

public class ChatViewDto
{
    public int Id { get; set; }

    public string? CreatedAt { get; set; }

    public string? ChatName { get; set; }

    public bool IsBlocked { get; set; }

    public bool IsRemoved { get; set; }

    public string Icon { get; set; }
}
