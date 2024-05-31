using Microsoft.AspNetCore.Mvc;
using PetZone.Service.Dto;
using PetZone.Services.Services;

namespace PetZone.Api.Areas.Authentication;

public class AuthenticationController : AuthenticationControllerBase
{
    private readonly AccountService _service;

    public AuthenticationController(AccountService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _service.LoginAsync(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Resgiter(RegisterDto dto)
    {
        var result = await _service.RegisterAsync(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    /// <summary>
    /// This method POST request with email to check against database.
    /// </summary>
    /// /// <param name="email">The Email of the user is passed.</param>
    /// <returns>A JSON response indicating whether the email was found or not found error message.</returns>
    [HttpGet("user-email-exists")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CheckEmailExists([FromQuery] string email)
    {
        var result = await _service.CheckEmailExists(email);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpGet("user-profile/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UserProfile(string id)
    {
        var result = await _service.GetUserProfileAsync(id);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPost("forgot-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        var response = await _service.ForgotPasswordAsync(dto);

        if (response.IsValid)
        {
            return Ok(response.Result);
        }

        return BadRequest(response.Errors);
    }

    [HttpPut("change-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        // Extract the token from the request headers or query parameters
        //string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        var response = await _service.ResetPasswordAsync(dto);

        if (response.IsValid)
        {
            return Ok(response.Result);
        }

        return BadRequest(response.Errors);
    }

    [HttpPut("update-profile")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileDto dto)
    {
        var result = await _service.UpdateProfile(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }
}
