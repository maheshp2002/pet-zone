using Microsoft.AspNetCore.Http;

namespace PetZone.Services.Dto;

public class MasterDto
{
    public List<MasterDataDto>? Breeds { get; set; }

    public List<MasterDataDto>? Categories { get; set; }
}
