using Microsoft.AspNetCore.Mvc;

namespace PetZone.Api.Areas.Admin;

[Area("Admin")]
[Route("api/[area]")]
[ApiController]
public class AdminControllerBase : ControllerBase
{
}
