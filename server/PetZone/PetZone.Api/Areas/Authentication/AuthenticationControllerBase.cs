using Microsoft.AspNetCore.Mvc;

namespace PetZone.Api.Areas.Authentication;

[Area("Authentication")]
[Route("api/[area]")]
[ApiController]
public class AuthenticationControllerBase : ControllerBase
{
}
