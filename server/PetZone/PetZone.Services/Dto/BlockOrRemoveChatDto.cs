namespace PetZone.Services.Dto;

public class BlockOrRemoveChatDto
{
    public string SellerId{ get; set; }

    public int PetDetailsId { get; set; }

    public bool IsBlockedOrRemoved { get; set; }
}
