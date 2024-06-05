using Microsoft.AspNetCore.Http;

namespace PetZone.Services.Dto;

public class AddMessageDto
{
    public int ChatId{ get; set; }

    public string? Content { get; set; }

    public IFormFile? File { get; set; }

    public bool IsFile { get; set; }

}
