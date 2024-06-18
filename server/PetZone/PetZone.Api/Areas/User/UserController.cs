using Microsoft.AspNetCore.Mvc;
using talent_portal.Service.Services;

namespace PetZone.Api.Areas.User;

public class UserController : UserControllerBase
{
    private readonly PetDetailsService _petDetailService;

    public UserController(PetDetailsService service)
    {
        _petDetailService = service;
    }

    [HttpGet("pet-details/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllPetDetails(string userId)
    {
        var result = await _petDetailService.GetAllPetDetailsAsync(false, userId);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpGet("pet-details/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetPetDetails(int id)
    {
        var result = await _petDetailService.GetPetDetailsByIdAsync(id);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }
}
