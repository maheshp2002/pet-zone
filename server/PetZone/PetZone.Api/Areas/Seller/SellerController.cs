﻿using Microsoft.AspNetCore.Mvc;
using PetZone.Services.Dto;
using talent_portal.Service.Services;

namespace PetZone.Api.Areas.Seller;

public class SellerController : SellerControllerBase
{
    private readonly PetDetailsService _petDetailService;

    public SellerController(PetDetailsService service)
    {
        _petDetailService = service;
    }

    [HttpGet("pet-details")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllPetDetails()
    {
        var result = await _petDetailService.GetAllPetDetailsAsync();
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPost("pet-details")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddPetDetails(PetDetailsDto dto)
    {
        var result = await _petDetailService.PetDetailsAsync(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPut("pet-details")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdatePetDetails(PetDetailsDto dto)
    {
        var result = await _petDetailService.PetDetailsAsync(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }
}
