using Microsoft.AspNetCore.Mvc;
using PetZone.Api.Areas.Message;
using PetZone.Services.Dto;
using System.Security.Claims;
using talent_portal.Service.Services;

namespace PetZone.Api.Areas.Chat;

public class ChatController : ChatControllerBase
{
    private readonly ChatService _chatService;

    public ChatController(ChatService service)
    {
        _chatService = service;
    }

    [HttpGet("chat")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllChats()
    {
        // Extract the token from the request headers or query parameters
        //string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var result = await _chatService.GetAllChatsAsync(userId);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPost("chat")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateChats(CreateChatDto dto)
    {
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var result = await _chatService.CreateChatsAsync(userId, dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPut("block-chat")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> BlockChats(BlockOrRemoveChatDto dto)
    {
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var result = await _chatService.BlockChatsAsync(userId, dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPut("chat")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveChats(BlockOrRemoveChatDto dto)
    {
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var result = await _chatService.RemoveChatsAsync(userId, dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPost("message")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddMessage([FromForm] AddMessageDto dto)
    {
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var result = await _chatService.AddMessageAsync(userId, dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpPut("message")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveMessage(AddMessageDto dto)
    {
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var result = await _chatService.RemoveMessageAsync(dto);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }

    [HttpGet("message/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetMessage(int id)
    {
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var result = await _chatService.GetMessageAsync(userId, id);
        if (result.IsValid)
            return Ok(result);

        return BadRequest(result.Errors);
    }
}
