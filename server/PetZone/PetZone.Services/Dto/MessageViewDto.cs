namespace PetZone.Services.Dto;

public class MessageViewDto
{
    public int Id { get; set; }

    public string? Time { get; set; }

    public string? Date { get; set; }

    public string? Content { get; set; }

    public bool IsSenderUser { get; set; }

    public bool IsDeleted { get; set; }
}
