using Microsoft.AspNetCore.Mvc;

namespace PetZone.Api.Areas.Message;

[Area("Chat")]
[Route("api/[area]")]
[ApiController]
public class ChatControllerBase : ControllerBase
{
}
