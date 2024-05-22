using Microsoft.AspNetCore.Mvc;

namespace PetZone.Api.Areas.User;

[Area("User")]
[Route("api/[area]")]
[ApiController]
public class UserControllerBase : ControllerBase
{
}
