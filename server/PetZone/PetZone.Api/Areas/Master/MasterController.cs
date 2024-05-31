using Microsoft.AspNetCore.Mvc;
using PetZone.Services.Dto;
using talent_portal.Service.Services;

namespace PetZone.Api.Areas.Master;

public class MasterController : MasterControllerBase
{
    private readonly MasterService _masterService;

    public MasterController(MasterService service)
    {
        _masterService = service;
    }

    [HttpGet("master")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetMaster()
    {
        var result = await _masterService.GetAllMasterDataAsync();
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPost("breed")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddBreed(MasterDataDto dto)
    {
        var result = await _masterService.AddBreed(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPost("category")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddCategory(MasterDataDto dto)
    {
        var result = await _masterService.AddCategory(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }
}
